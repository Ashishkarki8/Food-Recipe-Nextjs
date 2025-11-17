import logoImg from "@/assets/logo.png";
import Image from 'next/image';
import Link from 'next/link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import NavLink from "./nav-link";

const MainHeader = () => {
  return (
    <>
    <MainHeaderBackground></MainHeaderBackground>
    <header className={classes.header}>
     <Link className={classes.logo} href="/">
     <Image src={logoImg} alt="logo" priority />
        </Link>   
        <nav className={classes.nav}>
            <ul>
                <li>
                <NavLink href="/meals">Browser Meals</NavLink>  {/* calling clientside compoentnt in server side component*/}
                <NavLink href="/community">Foodies Community</NavLink>  {/* calling clientside compoentnt in server side component*/}
                    {/* <Link href="/meals" className={path.startsWith('/meals')? classes.active:undefined}>Browse Links</Link>
                    <Link href="/community" className={path.startsWith('/community')? classes.active:undefined}>food comunity</Link> */}
                </li>
            </ul>
        </nav>
    
    </header>
    </>
  )
}

export default MainHeader