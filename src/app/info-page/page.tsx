'use client';

import { Text, Box, Flex, Heading, Wrap, Spinner, Alert, Button, ButtonGroup } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

import Header from '@/app/components/Header';
import Item from './Item';

const GET_CHARACTERS = gql`
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
          perPage
          total
          lastPage
        }

        characters {
          image {
            large
          }
          id
          name {
            full
          }
          favourites
          description
          siteUrl
        }
      }
    }
`

interface IData {
    Page: {
        characters: ICharacter[];
        pageInfo: {
            currentPage: number;
            hasNextPage: number;
            perPage: number;
            total: number;
            lastPage: number;
        }
    }
};

export interface ICharacter {
    id: string;
    favourites: number;
    description: string;
    siteUrl: string;
    image: {
        large: string;
    };
    name: {
        full: string;
    }
};

/*
examples URL:
    /info-page
    /info-page?page=10
*/
const InfoPage = () => {
    const searchParams = useSearchParams();
    const searchPage = parseInt(searchParams.get('page') || '') || 1;

    const { loading, error, data } = useQuery<IData>(GET_CHARACTERS, {
        variables: {
            'page': searchPage,
            'perPage': 20
        },
    });

    if (error) return <Alert>{error.message}</Alert>;
    if (loading || !data) return <Spinner />

    const { characters, pageInfo } = data.Page;

    return (
        <Box>
            <Header />
            <Flex align='center' direction='column'>
                <Heading p={4}>Information Page</Heading>
                <Box maxW='6xl'>
                    <Wrap justify='center'>
                        {characters.length ?
                            characters.map(item => <Item key={item.id} item={item} />)
                            :
                            <Alert status='error'>Empty Data!</Alert>
                        }
                    </Wrap>
                </Box>

                {/* pagination */}
                <ButtonGroup variant='outline' p={8}>
                    <Wrap align='center'>
                        <Link href={`/info-page?page=${pageInfo.currentPage - 1}`}>
                            <Button colorScheme='blue' isDisabled={pageInfo.currentPage <= 1}>Previous Page</Button>
                        </Link>
                        <Text>Page {pageInfo.currentPage} / {pageInfo.lastPage}</Text>
                        <Link href={`/info-page?page=${pageInfo.currentPage + 1}`}>
                            <Button colorScheme='blue' isDisabled={!pageInfo.hasNextPage}>Next Page</Button>
                        </Link>
                    </Wrap>
                </ButtonGroup>

                <Box>
                    API Endpoint: {process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
                </Box>
            </Flex >
        </Box >
    )
}

export default InfoPage;