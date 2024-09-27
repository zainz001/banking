import Image from "next/image";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
  <main className="flex min-h-screen w-full justify-between font-inter">
      
      {children}
<div className="auth-asset">
  <div>
    <Image 
    src="icons/auth-image.svg"
    alt="Auth image"
    />
  </div>

</div>
  </main>
  );
  }
  
  //ibm a setup yaha hamry poora project ma yahi font rakhny ka kaam aye ga 
  //logo and project  ka naam idhr sa hi rakha