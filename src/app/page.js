import dynamic from 'next/dynamic';
import Loading from './components/Loading';
import { wordpressGraphQlApiUrl } from "../app/utils/variables";
import Image from 'next/image';

export default async function Home() {



  const Home = dynamic(() => import('../app/components/Home'), {
    ssr: false,
    loading: () => <Loading />
  });



  const pagedata = await getPageData()
  const pageDataGet = pagedata.data.pages.nodes[0].homeAcf

  //console.log(pagedata.data.pages.nodes[0].homeAcf.bannerTitle)
  return (
    <>
      {/* HERO START */}
      <section className="hero spacing-100 d-flex align-items-center text-white position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12" data-aos="fade-up">
              <h1 className='heading-primary mb-3' >{pageDataGet.bannerTitle}</h1>
              <p
              >{pageDataGet.bannerDescription}</p>
            </div>
          </div>
        </div>
        <Image quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC" width='1500' height='800' src={pageDataGet.bannerImage.node.sourceUrl} alt={pageDataGet.bannerImage.node.altText} />
      </section>
      {/* HERO END */}
      <Home />

    </>

  )
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

  //console.log(pagedata.data.pages.nodespageDataGet)

  return {
    title: pageDataGet[0].seo.title.replace('api.', ''),
    description: pageDataGet[0].seo.metaDesc.replace('api.', ''),
    alternates: {
      canonical: pageDataGet[0].seo.canonical.replace('api.', ''),
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

