import SectionBanner from "../components/SectionBanner";
import { wordpressGraphQlApiUrl, frontendUrl } from "../utils/variables";
// import dynamic from 'next/dynamic';
// import Loading from "../components/Loading";
//import DoctorsList from '../components/DoctorsList';
import Images from "../components/Images";
import { AOSInit } from "../components/Aos";



export default async function DoctorsPage() {


  const pagedata = await getPageData()
  ////console.log(pagedata)
  const page = pagedata.data.pages.nodes



  const data = await getDoctorsData()
  ////console.log(data.data.doctors.nodes)
  const doctorsPosts = data.data.doctors.nodes







  // const DoctosList = dynamic(() => import('../components/DoctorsList'), {
  //   ssr: false,
  //   loading: () => <Loading />
  // });


 

  return (
    <>
      <AOSInit />
      {/* PAGE TITLE START */}
      {/* <SectionBanner type="page-heading" background={page[0].featuredImage.node.sourceUrl} heading={page[0].title} subHeading={page[0].pageACF.subHeading} description={page[0].title} /> */}
      <div
        style={{ background: `url(${page[0].featuredImage.node.sourceUrl})` }}
        className="parallax-banner page-header aspect-[2/1] spacing-100 d-flex align-items-center justify-content-center text-center position-relative text-white"
      >
        <section className='cta'>
          <div className="content d-flex align-items-center justify-content-center">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className='heading-secondary mb-sm-4 mb-2'>{page[0].title}</h1>
                  <p className='mb-0 mt-sm-4 mt-2'>{page[0].pageACF.subHeading}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* CTA BOTTOM END */}
      {/* PAGE TITLE  END */}
      {/* ABOUT SECTION START */}
      <section className='about-section spacing-100 pb-0 text-tertiary '>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-normal" data-aos="fade-up" data-aos-delay={500} dangerouslySetInnerHTML={{ __html: page[0].pageACF.about }} />
              <hr className='mt-5 border-1' />
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT SECTION END */}
      {/* DOCTORS SECTION START */}
      <section className='spacing-100 pt-0 text-tertiary pt-sm-5 mt-sm-5'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {doctorsPosts.map((doctor, key) => {
                return (<>
                  <div className="sticky-column clearfix" id={doctor.doctorACF.id} key={key} data-aos="fade-up">
                    <div className="left sticky">
                      <h2 className='heading-secondary text-tertiary text-capitalize'>{doctor.categories.nodes[0].name}</h2>
                      <p className='mt-3'>{doctor.categories.nodes[0].description}</p>
                    </div>
                    <div className="right">
                      <div className="box mb-5">
                        <Images
                          placeholder={true}
                          imageurl={doctor.featuredImage.node.sourceUrl}
                          styles={''}
                          quality={80}
                          width={250}
                          height={250}
                          alt={doctor.featuredImage.node.altText}
                          classes={'doctor-photo d-block w-100 mx-auto'}
                        />
                        <h3 className='heading-tertiary'>{doctor.title}</h3>
                        <span className='time'>{doctor.doctorACF.time}</span>
                        <div dangerouslySetInnerHTML={{ __html: doctor.content }} />
                      </div>
                    </div>
                  </div>
                </>)
              })}
            </div>
          </div>
        </div>
      </section>
      {/* DOCTORS SECTION END */}
      <SectionBanner background={page[0].featuredImage.node.sourceUrl} heading={page[0].pageACF.ctaBannerHeading} description={page[0].pageACF.ctaBannerDescription} link={page[0].pageACF.ctaButtonUrl} button={page[0].pageACF.ctaButtonLabel} />

    </>
  )
}





//DOCTORS DATA
async function getDoctorsData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
        doctors {
          nodes {
            title
            content
           
           categories{
            nodes{
              taxonomyName
              termTaxonomyId
              name
              description
             }
          }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            doctorACF {
              time
              id
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
      query: `  query Posts {
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



export async function generateMetadata({ params }) {

  const pagedata = await getPageData()
  const pageDataGet = pagedata.data.pages.nodes



  // //console.log(pagedata.data.pages.nodespageDataGet)


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
