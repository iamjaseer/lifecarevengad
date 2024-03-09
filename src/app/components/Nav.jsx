

"use client"
import React, { useState, useEffect, useRef, useLayoutEffect, } from 'react';
import Link from 'next/link';
import getURL from "../homeUrl";
import Image from 'next/image';
import Logo from './Logo';
//import { cookies } from 'next/headers'
import {AosAnimation} from "./Aos";






function Header(props) {


  const {
    url,
    logoalt
  } = props




  //TOGGLE MENU
  const [isOpen, setOpen] = useState(false);


  // HEADER FIXED
  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
      let lastScrollY = window.pageYOffset;

      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);

    return scrollDirection;
  };


  const scrollDirection = useScrollDirection();



  return (<>
    {/* HEADER START */}
    <header className={`sticky ${scrollDirection === "down" ? "nav-down" : "nav-up"} py-4 position-sticky`} >
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <Logo url={url} alt={logoalt} />
            <nav className="d-flex align-items-center justify-content-between">
              <ul className="list-inline mb-0 me-4 d-none d-lg-block">
                <li className="list-inline-item">
                  <Link rel="nofollow" aria-label="Home" href={getURL("/")}>Home</Link>
                </li>
                <li className="list-inline-item">
                  <Link rel="nofollow" aria-label="Doctors" href={getURL("/doctors")}>Doctors</Link>
                </li>
                <li className="list-inline-item">
                  <Link rel="nofollow" aria-label="Specialties" href={getURL("/specialties")}>Specialties</Link>
                </li>
                <li className="list-inline-item">
                  <Link rel="nofollow" aria-label="Blog" href={getURL("/blogs")}>Blog</Link>
                </li>
                <li className="list-inline-item">
                  <Link rel="nofollow" aria-label="Appointment" href={getURL("/appointment")}>Appointment</Link>
                </li>
              </ul>
              <button
                aria-label="Hamburger Button"
                onClick={() => setOpen(!isOpen)}
                className={`hamburger-button d-lg-none ${isOpen ? "open" : "close"}`}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_429_11066)">
                    <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#142044" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_429_11066">
                      <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <Link rel="nofollow" aria-label="Phone" href="tel:9207814444" className="btn btn-primary btn-md px-4 py-3 rounded-1 text-uppercase d-none d-xl-block">BOOKING
                9207814444 </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
    {/* HEADER END */}
    {/* MOBILE MENU */}
    <div className={`panel ${isOpen ? "open" : "close"}`}>
      <div>
        <button
          aria-label="Hamburger Button"
          onClick={() => setOpen(!isOpen)}
          className={`hamburger-button close d-lg-none ${isOpen ? "open" : "close"}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#142044" />
          </svg>
        </button>
        <ul className="list-unstyled mb-0">
          <li>
            <Link rel="nofollow" aria-label="Home" href={getURL("/")} onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li >
            <Link rel="nofollow" aria-label="Doctors" href={getURL("/doctors")} onClick={() => setOpen(false)}>Doctors</Link>
          </li>
          <li >
            <Link rel="nofollow" aria-label="Specialties" href={getURL("/specialties")} onClick={() => setOpen(false)}>Specialties</Link>
          </li>
          <li >
            <Link rel="nofollow" aria-label="Blog" href={getURL("/blogs")} onClick={() => setOpen(false)}>Blog</Link>
          </li>
          <li >
            <Link rel="nofollow" aria-label="Appointment" href={getURL("/appointment")} onClick={() => setOpen(false)}>Appointment</Link>
          </li>
        </ul>
      </div>
    </div>
  </>)


}


export default Header
