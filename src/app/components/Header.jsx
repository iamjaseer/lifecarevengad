


import Link from "next/link";
import Nav from "./Nav";
import { logoUrl, logoAlt } from "../utils/LogoApi";



export default function Header(props) {

  

  return (
    <>
      <Nav url={logoUrl} logoalt={logoAlt} />
       </>
  )
}



