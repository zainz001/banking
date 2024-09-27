import Image from 'next/image';
import Sidebar from '../../components/Sidebar'
import Mobilebar from '../../components/Mobilebar';
import { getLoggedInUser } from '../../lib/actions/user.actions';
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedin= await getLoggedInUser();
  if(!loggedin) redirect('/sign_in')
  return (
<main className="flex h-screen w-full font-inter">
    <Sidebar user={loggedin} />
    <div className=" flex flex-col size-full">
      <div className="root-layout">
        <Image src="icons/logo.svg" width={30} height={30} alt="logo"/>
        <div>
          <Mobilebar user={loggedin}/>
          </div>
        </div>
    {children}
        <div>

        

      </div>

    </div>
</main>
);
}

//ibm a setup yaha hamry poora project ma yahi font rakhny ka kaam aye ga 
//logo and project  ka naam idhr sa hi rakha