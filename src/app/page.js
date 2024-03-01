import dynamic from 'next/dynamic';
import Loading from './components/Loading';
import { wordpressGraphQlApiUrl } from "../app/utils/variables";

export default async function Home() {



  const Home = dynamic(() => import('../app/components/Home'), {
    ssr: false,
    loading: () => <Loading/>
  });
  

  return (
    <>

      <Home/>

    </>

  )
}






//PAGE QUERY
async function getPageData() {

  const res = await fetch(wordpressGraphQlApiUrl,  {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
      query: ` query Posts {
        pages(where: {id: 2}) {
          nodes {
            title
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
  cache: 'force-cache' ,
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

  console.log(pagedata.data.pages.nodespageDataGet)

  return {
    title: pageDataGet[0].seo.title.replace('api.',''),
    description:pageDataGet[0].seo.metaDesc.replace('api.',''),
    alternates: {
      canonical: pageDataGet[0].seo.canonical.replace('api.',''),
    },
    openGraph: {
      description: pageDataGet[0].seo.metaDesc.replace('api.',''),
      siteName: pageDataGet[0].seo.opengraphSiteName.replace('api.',''),
      url: pageDataGet[0].seo.opengraphUrl.replace('api.',''),
      images: pageDataGet[0].seo.opengraphImage.sourceUrl.replace('api.',''),
      locale: 'en_US',
      type: pageDataGet[0].seo.opengraphType.replace('api.',''),
      articleModifiedTime: pageDataGet[0].seo.opengraphModifiedTime.replace('api.',''),

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
 