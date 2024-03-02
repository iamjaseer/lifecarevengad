import Link from 'next/link';
import SectionBanner from './SectionBanner';
import getURL from '../homeUrl';
import Image from 'next/image'
import { wordpressGraphQlApiUrl } from "../utils/variables";
import RoundAnimation from './RoundAnimation'
import Doctors from './Doctors';


export default async function Home() {


  const pagedata = await getPageData()
  //console.log(pagedata.data.pages.edges[0].node)
  const pageDataGet = pagedata.data.pages.edges[0].node


  return (
    <>
      {/* HERO START */}
      <section className="hero spacing-100 d-flex align-items-center text-white position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12">
            <h1 className='heading-primary mb-3' data-aos="fade-up">{pageDataGet.homeAcf.bannerTitle}</h1>
              <p
                data-aos="fade-up"
                data-aos-delay={1000}
              >{pageDataGet.homeAcf.bannerDescription}</p>
            </div>
          </div>
        </div>
        <Image quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC" width='1500' height='800' src={pageDataGet.homeAcf.bannerImage.node.sourceUrl} alt={pageDataGet.homeAcf.bannerImage.node.altText} />
      </section>
      {/* HERO END */}
      {/* ABOUT START */}
      <SectionBanner background={pageDataGet.homeAcf.aboutBackground.node.sourceUrl} heading={pageDataGet.homeAcf.aboutHeading} description={pageDataGet.homeAcf.aboutDescription} link={'specialties'} button={pageDataGet.homeAcf.button} />
      {/* ABOUT END */}
      {/* MISSION START */}
      <section className="mission h-half d-flex align-items-center justify-content-center overflow-hidden position-relative">
        <div className="container spacing-150">
          <div className="row">
            <div className="col-xl-4">
              <Image
                quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
                width='500' height='500'
                src={pageDataGet.homeAcf.missionAndVisionBanner.node.sourceUrl}
                className='rounded-5 d-block w-100'
                alt={pageDataGet.homeAcf.missionAndVisionBanner.node.altText}

              />
            </div>
            <div className="col-xl-5 offset-xl-1 d-flex align-items-center mt-5 mt-xl-0">
              <div>
                 <span className='heading-tertiary mb-3 text-tertiary'  dangerouslySetInnerHTML={{ __html: pageDataGet.homeAcf.missionHeading }} />
                <p
                  className='text-tertiary mt-3'

                >{pageDataGet.homeAcf.missionDescription}</p>
                 <span className='heading-tertiary mt-5 mb-3 text-tertiary d-block'  dangerouslySetInnerHTML={{ __html: pageDataGet.homeAcf.visionHeading }} />
                <p className='text-tertiary'

                >{pageDataGet.homeAcf.visionDescription} </p>
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
            <span className='heading-secondary'
                data-aos="fade-up"  dangerouslySetInnerHTML={{ __html: pageDataGet.homeAcf.doctorsHeading }} />
              <p className='mt-4' data-aos="fade-up" data-aos-delay={500}>{pageDataGet.homeAcf.doctorsDescription} </p>
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
      <SectionBanner type="column" background={pageDataGet.homeAcf.specialtiesImage.node.sourceUrl} heading={pageDataGet.homeAcf.specialititiesHeading} description={pageDataGet.homeAcf.specialititiesDescription} />
      {/* SPECIALITIES END */}
      {/* CTA BOTTOM START */}
      <SectionBanner background={pageDataGet.homeAcf.aboutBackground.node.sourceUrl} heading={pageDataGet.homeAcf.ctaHeading} description={pageDataGet.homeAcf.ctaDescription} link={'appointment'} button={pageDataGet.homeAcf.ctaButton} />
      {/* CTA BOTTOM END */}
    </>
  )
}


//HOME DATA
async function getPageData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
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
`,
    }),
    next: { revalidate: 10 },
  },
    {
      cache: 'force-cache',
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
