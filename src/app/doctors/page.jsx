import Image from "next/image";
import SectionBanner from "../components/SectionBanner";
import { wordpressGraphQlApiUrl  } from "../utils/variables";
import dynamic from 'next/dynamic';
import Loading from "../components/Loading";


//PAGE QUERY
async function getPageData() {
  const query = `
  {
    pages(where: {id: 44}) {
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
          ctaBannerHeading
          ctaBannerDescription
          ctaButtonLabel
          ctaButtonUrl
             
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




export default async function DoctorsPage() {



const DoctosList = dynamic(() => import('../components/DoctorsList'), {
  ssr: false,
  loading: () => <Loading/>
});




  return (
    <>
  
        {/* PAGE TITLE START */}
        <SectionBanner type="page-heading" background={page[0].featuredImage.node.sourceUrl} heading={page[0].title} subHeading={page[0].pageACF.subHeading} description={page[0].title} />
        {/* PAGE TITLE  END */}
        {/* ABOUT SECTION START */}
        <section className='about-section spacing-100 pb-0 text-tertiary '>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div data-aos="fade-up" data-aos-delay={500} dangerouslySetInnerHTML={{ __html: page[0].pageACF.about }} />
                <hr className='mt-5 border-1' />
              </div>
            </div>
          </div>
        </section>
        {/* ABOUT SECTION END */}
        {/* DOCTORS SECTION START */}
        <DoctosList/>
        {/* DOCTORS SECTION END */}
        <SectionBanner background={page[0].featuredImage.node.sourceUrl} heading={page[0].pageACF.ctaBannerHeading} description={page[0].pageACF.ctaBannerDescription} link={page[0].pageACF.ctaButtonUrl} button={page[0].pageACF.ctaButtonLabel} />
    
    </>
  )
}





