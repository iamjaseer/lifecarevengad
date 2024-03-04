'use client'

import Link from 'next/link';
import { ParallaxProvider, Parallax, ParallaxBanner } from 'react-scroll-parallax';
import getURL from "../homeUrl";
import { useEffect } from 'react';
import AOS from 'aos';




export default function SectionBanner(props){

    useEffect(() => {

        AOS.init({
             duration: 800,
             once: false,
           })
       
         }, [])


        


switch(props.type) {
    case 'column':
       return     <ParallaxProvider>
        <ParallaxBanner
       layers={[{ image: props.background, speed: -5 }]}
       className="parallax-banner aspect-[2/1] h-half spacing-100 d-flex align-items-center justify-content-center bg-primary position-relative text-white"
     >
       <section className='specialities'>
         <div className="content d-flex align-items-center">
           <div className="container">
             <div className="row">
               <div className="col-xl-6">
                 <h2 className='heading-secondary mb-sm-4 mb-2' data-aos="fade-up" >{props.heading}</h2>
               </div>
               <div className="col-xl-6">
                 <div data-aos="fade-up" data-aos-delay={500} dangerouslySetInnerHTML={{ __html: props.description }} />
                 <Link aria-label="Read more" data-aos="fade-up" data-aos-delay={500} href={getURL('/specialties')} className='btn btn-outline p-3 px-4 text-uppercase mt-4'>READ MORE</Link>
               </div>
             </div>
           </div>
         </div>
       </section>
     </ParallaxBanner>
     </ParallaxProvider>
      break;
    case 'page-heading':
      return <ParallaxProvider>
      <ParallaxBanner
          layers={[{ image: props.background, speed: -5 }]}
          className="parallax-banner aspect-[2/1] spacing-100 d-flex align-items-center justify-content-center bg-primary text-center position-relative text-white"
        >
          <section className='cta'>
            <div className="content d-flex align-items-center justify-content-center">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 data-aos="fade-up" className='heading-secondary mb-sm-4 mb-2'>{props.heading}</h1>
                    <p className='mb-0' data-aos="fade-up" data-aos-delay={500}>{props.subHeading}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ParallaxBanner>
        {/* CTA BOTTOM END */}
      </ParallaxProvider>
      break;
    default:
      return <ParallaxProvider>
      <ParallaxBanner
          layers={[{ image: props.background, speed: -5 }]}
          className="parallax-banner h-half aspect-[2/1] spacing-100 d-flex align-items-center justify-content-center bg-primary text-center position-relative text-white"
        >
          <section className='cta'>
            <div className="content d-flex align-items-center justify-content-center">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2 data-aos="fade-up" className='heading-secondary mb-sm-4 mb-2'>{props.heading}</h2>
                    <p className='mb-0' data-aos="fade-up" data-aos-delay={500}>{props.description}</p>
                    <Link aria-label="View more" data-aos="fade-up" data-aos-delay={500} href={getURL('/'+props.link+'')} className='btn btn-outline p-3 px-4 text-uppercase mt-sm-3 mt-2'>{props.button}</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ParallaxBanner>
        {/* CTA BOTTOM END */}
      </ParallaxProvider>
  }

}