import Feeds from '@/components/Feeds';
import LeftSideNav from '@/components/LeftSideNav'
import RightSideNav from '@/components/RightSideNav';
import { getSession } from '@auth0/nextjs-auth0';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const session = await getSession()
    let user = session?.user && session.user as Auth0User;

    return (
        <html lang="en">
            <body>
                {
                    user && session ? (
                        <div className=' flex items-center justify-between'>
                            <LeftSideNav user={user} session={session} />
                            {children}
                            <RightSideNav user={user} session={session} />
                        </div>
                    ) : (
                        <div>Unauthorized</div>
                    )
                }
            </body>
        </html>
    );
}
