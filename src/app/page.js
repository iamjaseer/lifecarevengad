import { wordpressGraphQlApiUrl, frontendUrl } from "../app/utils/variables";
import SectionBanner from './components/SectionBanner';
import RoundAnimation from './components/RoundAnimation';
import Link from 'next/link';
import getURL from './homeUrl';
import Doctors from './components/Doctors';
import Images from './components/Images';



export default async function Home() {



  // const Home = dynamic(() => import('../app/components/Home'), {
  //   ssr: false,
  //   loading: () => <Loading/>
  // });



  const pagedata = await getHomeData()
  //console.log(pagedata.data.pages.edges[0].node.homeAcf.bannerImage.node)
  const pageDataGet = pagedata.data.pages.edges[0].node.homeAcf





  ////console.log(pagedata.data.pages.nodes[0].bannerTitle)
  return (
    <>
      {/* HERO START */}
      <section className="hero spacing-100 d-flex align-items-center text-white position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12" data-aos='fade-up'>
              <h1 className='heading-primary mb-3' >{pageDataGet.bannerTitle}</h1>
              <p
              >{pageDataGet.bannerDescription}</p>
            </div>
          </div>
        </div>
        <Images
          imageurl={pagedata.data.pages.edges[0].node.homeAcf.bannerImage.node.sourceUrl}
          styles={''}
          quality={80}
          width={1500}
          height={800}
          placeholder={true}
          alt={pagedata.data.pages.edges[0].node.homeAcf.bannerImage.node.altText}
          classes={''}
        />
      </section>
      {/* HERO END */}
      {/* <Home/> */}
      {/* ABOUT START */}
      <SectionBanner background={pageDataGet.aboutBackground.node.sourceUrl} heading={pageDataGet.aboutHeading} description={pageDataGet.aboutDescription} link={'specialties'} button={pageDataGet.button} />
      {/* ABOUT END */}
      {/* MISSION START */}
      <section className="mission h-half d-flex align-items-center justify-content-center overflow-hidden position-relative">
        <div className="container spacing-150">
          <div className="row">
            <div className="col-xl-4">
              <Images
                imageurl={pageDataGet.missionAndVisionBanner.node.sourceUrl}
                styles={''}
                quality={80}
                width={500}
                height={500}
                placeholder={true}
                alt={pageDataGet.missionAndVisionBanner.node.altText}
                classes={'rounded-5 d-block w-100'}
              />
            </div>
            <div className="col-xl-5 offset-xl-1 d-flex align-items-center mt-5 mt-xl-0">
              <div>
                <span className='heading-tertiary mb-3 text-tertiary' dangerouslySetInnerHTML={{ __html: pageDataGet.missionHeading }} />
                <p
                  className='text-tertiary mt-3'

                >{pageDataGet.missionDescription}</p>
                <span className='heading-tertiary mt-5 mb-3 text-tertiary d-block' dangerouslySetInnerHTML={{ __html: pageDataGet.visionHeading }} />
                <p className='text-tertiary'

                >{pageDataGet.visionDescription} </p>
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
                data-aos="fade-up" dangerouslySetInnerHTML={{ __html: pageDataGet.doctorsHeading }} />
              <p className='mt-4' data-aos="fade-up" data-aos-delay={500}>{pageDataGet.doctorsDescription} </p>
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
      <SectionBanner type="column" background={pageDataGet.specialtiesImage.node.sourceUrl} heading={pageDataGet.specialititiesHeading} description={pageDataGet.specialititiesDescription} />
      {/* SPECIALITIES END */}
      {/* CTA BOTTOM START */}
      <SectionBanner background={pageDataGet.aboutBackground.node.sourceUrl} heading={pageDataGet.ctaHeading} description={pageDataGet.ctaDescription} link={'appointment'} button={pageDataGet.ctaButton} />
      {/* CTA BOTTOM END */}
    </>

  )
}




//HOME DATA
async function getHomeData() {

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



//PAGE QUERY
async function getPageData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
        pages(where: {id: 2}) {
          nodes {
            title
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
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            seo {
            canonical
              metaDesc
              metaKeywords
              title
              opengraphDescription
              opengraphSiteName
              opengraphUrl
              opengraphImage {
                altText
                link
                sourceUrl
              }
              opengraphType
              opengraphTitle
              opengraphModifiedTime
              twitterDescription
              twitterTitle
              twitterImage {
                sourceUrl
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



export async function generateMetadata() {

  const pagedata = await getPageData()
  const pageDataGet = pagedata.data.pages.nodes

  ////console.log(pagedata.data.pages.nodespageDataGet)

  return {
    title: pageDataGet[0].seo.title.replace('api.', ''),
    description: pageDataGet[0].seo.metaDesc.replace('api.', ''),
    alternates: {
      canonical: pageDataGet[0].seo.opengraphUrl.replace('api.', '').replace(/\/$/, ""),
    },
    openGraph: {
      description: pageDataGet[0].seo.metaDesc.replace('api.', ''),
      siteName: pageDataGet[0].seo.opengraphSiteName.replace('api.', ''),
      url: pageDataGet[0].seo.opengraphUrl.replace('api.', ''),
      images: pageDataGet[0].seo.opengraphImage.sourceUrl.replace('api.', ''),
      locale: 'en_US',
      type: pageDataGet[0].seo.opengraphType.replace('api.', ''),
      articleModifiedTime: pageDataGet[0].seo.opengraphModifiedTime.replace('api.', ''),

    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Life Care Clinic - Your Best clinic in vengad!',
    //   description: 'Looking for the best clinic in Vengad? Experience top-quality care at Life Care Clinic. Your health is our priority',
    //    images: ['https://lifecarevengad.com/wp-content/uploads/2024/02/doctor-2.webp'],
    // },
  }
}


// async function getData() {

// const res = await fetch(`https://api.lifecarevengad.com/graphql`,  {
//   method: "POST",
//   headers: {
//       "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//       query: `
//   query Posts {
//       posts(first: 5) {
//           nodes {
//               databaseId
//             title
//              date
//              slug
//             featuredImage {
//               node {
//                 altText
//                 sourceUrl
//               }
//             }
//           }
//         }
// }
// `,
//   }),
//   next: { revalidate: 10 },
// },
// {
//   cache: 'force-cache' ,
//   cache: 'no-store'
// }
// )



// if (!res.ok) {
//   // This will activate the closest `error.js` Error Boundary
//   throw new Error('Failed to fetch data')
// }


// return res.json()



// }

