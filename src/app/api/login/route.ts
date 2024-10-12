import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { IUserInfo } from '@/app/components/LoginForm';

// A simple API to simulate the authentication
// Server side: store a "loggedIn" cookie to mark if the user is logged in or not
// Client/browser side: store the user info to LocalStorage
export async function POST(request: Request) {
    const data: IUserInfo = await request.json();

    if (data.name && data.title) {
        const expire = 3600; // seconds

        cookies().set({
            name: 'loggedIn',
            value: 'true',
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 1000 * expire)
        });

        return NextResponse.json({ result: 'success', data });
    } else {
        return NextResponse.json({ result: 'missing username or title.' }, {
            status: 403,
        })
    }
}