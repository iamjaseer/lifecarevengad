import dynamic from "next/dynamic";
import RoundAnimation from "../components/RoundAnimation";
import { wordpressGraphQlApiUrl  } from "../utils/variables";
import Loading from "../components/Loading";








//PAGE QUERY
async function getPageData() {
  const query = `
  {
    pages(where: {id: 1110}) {
      nodes {
        title
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        pageACF {
          about
          sectionDescription
          sectionHeading
          subHeading
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





export default async function Appoinment() {


  const ContactInfo = dynamic(() => import('../components/ContactInfo'), {
    ssr: false,
    loading: () => <Loading/>
  });

  return (
    <>
  
        <section className="spacing-100">
          <div>
          <ContactInfo/>
          </div>
          <RoundAnimation />
        </section>
   
    </>
  )
}


