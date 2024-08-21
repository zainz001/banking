

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<main>
    sidebar
    {children}
</main>
);
}

//ibm a setup yaha hamry poora project ma yahi font rakhny ka kaam aye ga 
//logo and project  ka naam idhr sa hi rakha