import dynamic from 'next/dynamic';
import Loading from './components/Loading';
import { wordpressGraphQlApiUrl } from "../app/utils/variables";


//PAGE QUERY
async function getPageData() {
  const query = `
  {
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
    `;

  const res = await fetch(
    wordpressGraphQlApiUrl + `?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
    }
  );

  const { data } = await res.json();

  return data.pages.nodes;
}


const page = await getPageData();

//console.log(page)

export async function generateMetadata({ params }) {



  return {
    title: page[0].seo.title,
    description:page[0].seo.metaDesc,
    openGraph: {
      description: page[0].seo.metaDesc,
      siteName: page[0].seo.opengraphSiteName,
      url: page[0].seo.opengraphUrl,
      images: page[0].seo.opengraphImage.sourceUrl,
      locale: 'en_US',
      type: page[0].seo.opengraphType,
      articleModifiedTime: page[0].seo.opengraphModifiedTime,

    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Life Care Clinic - Your Best clinic in vengad!',
    //   description: 'Looking for the best clinic in Vengad? Experience top-quality care at Life Care Clinic. Your health is our priority',
    //    images: ['https://lifecarevengad.com/wp-content/uploads/2024/02/doctor-2.webp'],
    // },
  }
}





export default async function Homepage(props) {

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





