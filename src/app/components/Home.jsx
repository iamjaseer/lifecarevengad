import Link from 'next/link';
import SectionBanner from './SectionBanner';
import getURL from '../homeUrl';
import Image from 'next/image'
import { wordpressGraphQlApiUrl } from "../utils/variables";
import RoundAnimation from './RoundAnimation'
import Doctors from './Doctors';


export default async function Home(){

    


  const { data } = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        `query Posts {
                pages(where: {title: "home"}) {
                  edges {
                    node {
                      id
                      homeAcf {
                        aboutDescription
                        aboutBackground {
                          node {
                            altText
                            sourceUrl
                          }
                        }
                        aboutHeading
                        bannerDescription
                        bannerImage {
                          node {
                            altText
                            sourceUrl
                          }
                        }
                        bannerTitle
                        button
                        buttonLabel
                        ctaButton
                        ctaDescription
                        ctaHeading
                        doctorsDescription
                        doctorsHeading
                        fieldGroupName
                        missionAndVisionBanner {
                          node {
                            altText
                            sourceUrl
                          }
                        }
                        missionDescription
                        missionHeading
                        specialititiesDescription
                        specialititiesHeading
                        specialtiesImage {
                          node {
                            altText
                            sourceUrl
                          }
                        }
                        visionDescription
                        visionHeading
                      }
                    }
                  }
                }
              }
    `
    }),
    next: { revalidate: 10 }
  }).then(res => res.json())

  let homePage = data.pages.edges[0].node

  //console.log(homePage.id)




  return (
    <>
    {/* HERO START */}
    <section className="hero spacing-100 d-flex align-items-center text-white position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className='heading-primary mb-3' data-aos="fade-up">{homePage.homeAcf.bannerTitle}</h1>
              <p
                data-aos="fade-up"
                data-aos-delay={1000}
              >{homePage.homeAcf.bannerDescription}</p>
            </div>
          </div>
        </div>
        <Image quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC" width='1500' height='800' src={homePage.homeAcf.bannerImage.node.sourceUrl} alt={homePage.homeAcf.bannerImage.node.altText} />
      </section>
      {/* HERO END */}
      {/* ABOUT START */}
      <SectionBanner background={homePage.homeAcf.aboutBackground.node.sourceUrl} heading={homePage.homeAcf.aboutHeading} description={homePage.homeAcf.aboutDescription} link={'specialties'} button={homePage.homeAcf.button} />
      {/* ABOUT END */}
      {/* MISSION START */}
      <section className="mission h-half d-flex align-items-center justify-content-center overflow-hidden position-relative">
          <div className="container spacing-150">
            <div className="row">
              <div className="col-xl-4">
  <Image
                quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
                width='500' height='500'
                  src={homePage.homeAcf.missionAndVisionBanner.node.sourceUrl}
                  className='rounded-5 d-block w-100'
                  alt={homePage.homeAcf.missionAndVisionBanner.node.altText}
                  
                />
              </div>
              <div className="col-xl-5 offset-xl-1 d-flex align-items-center mt-5 mt-xl-0">
                <div>
                  <h3
                    className='heading-tertiary mb-3 text-tertiary'
                     
                  >{homePage.homeAcf.missionHeading} </h3>
                  <p
                    className='text-tertiary'
                     
                  >{homePage.homeAcf.missionDescription}</p>
                  <h3
                    className='heading-tertiary mt-5 mb-3 text-tertiary'
                     
                  >{homePage.homeAcf.visionHeading} </h3>
                  <p className='text-tertiary'
                     
                  >{homePage.homeAcf.visionDescription} </p>
                </div>
              </div>
            </div>
          </div>
          <RoundAnimation />
        </section>
      {/* MISSION END */}


      {/* DOCTORS START */}
      <section className="doctors h-half d-flex align-items-center justify-content-center bg-light text-tertiary spacing-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <h3 className='heading-secondary mb-3'
                data-aos="fade-up"
              >{homePage.homeAcf.doctorsHeading} </h3>
              <p data-aos="fade-up" data-aos-delay={500}>{homePage.homeAcf.doctorsDescription} </p>
              <Link aria-label="Meet our doctors" href={getURL('/doctors')} className='btn btn-secondary-outline p-3 px-4 text-uppercase mt-3'
                data-aos="fade-up" data-aos-delay={500}
              >Meet our Doctors</Link>
            </div>
            <div className="col-xl-4 d-flex align-items-center justify-content-center mt-5 mt-xl-0">
              <div className="px-xl-5">
                <Doctors />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DOCTORS END */}
      {/* SPECIALITIES START */}
      <SectionBanner type="column" background={homePage.homeAcf.specialtiesImage.node.sourceUrl} heading={homePage.homeAcf.specialititiesHeading} description={homePage.homeAcf.specialititiesDescription} />
      {/* SPECIALITIES END */}
      {/* CTA BOTTOM START */}
      <SectionBanner background={homePage.homeAcf.aboutBackground.node.sourceUrl} heading={homePage.homeAcf.ctaHeading} description={homePage.homeAcf.ctaDescription} link={'appointment'} button={homePage.homeAcf.ctaButton} />
      {/* CTA BOTTOM END */}
    </>
  )
}
