import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>MDR Next JS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      {children}
    </div>
  )
}
