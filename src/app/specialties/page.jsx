import SectionBanner from "../components/SectionBanner";
import { wordpressGraphQlApiUrl } from "../utils/variables";
// import dynamic from "next/dynamic";
// import Loading from "../components/Loading";
import Images from "../components/Images";
import Link from "next/link";


export default async function SepecialitiesPage() {



  const pagedata = await getPageData()
  ////console.log(pagedata)
  const page = pagedata.data.pages.nodes



  const departmentData = await getDepartmentData()
  ////console.log(data.data.allDepartments.nodes)
  const departmentPosts = departmentData.data.allDepartments.nodes
  

  const fecilitiesData = await getFecilitiesData()
  ////console.log(data.data.allDepartments.nodes)
  const fecilitiesPosts = fecilitiesData.data.allFecilities.nodes



  // const DepartmentList = dynamic(() => import('../components/DepartmentList'), {
  //   ssr: false,
  //   loading: () => <Loading />
  // });


  // const FeclitiesList = dynamic(() => import('../components/FecilitiesList'), {
  //   ssr: false,
  //   loading: () => <Loading />
  // });




  return (<>
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
    {/* PAGE TITLE  END */}
    {/* ABOUT SECTION START */}
    <section className='about-section spacing-100 text-tertiary'>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div data-aos="fade-up" dangerouslySetInnerHTML={{ __html: page[0].pageACF.about }} />
            <hr className='mt-5 border-1' />
          </div>
        </div>
      </div>
    </section>
    {/* ABOUT SECTION END */}
    <div>
      {/* <DepartmentList /> */}
      <section data-aos="fade-up">
        <div className="container">
          {departmentPosts.map((department, key) => {
            return <div className="row spacing-100 pt-0" key={key} >
              <div className="col-xl-5 mb-3 mb-xl-0">
              <Images
                    imageurl={department.featuredImage.node.sourceUrl}
                    styles={''}
                    quality={80}
                    width={500}
                    height={500}
                    alt={department.featuredImage.node.altText}
                    classes={'w-100 d-block rounded-4'}
                    />
  </div>
              <div className="col-xl-7 d-flex align-items-center justify-content-center">
                <div className="ps-xl-5">
                  <h2 className='heading-secondary text-tertiary mb-3'>{department.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: department.content }} />
                  <Link rel="nofollow" aria-label="Doctors" className='mt-3 btn btn-outline-primary  px-4 py-3 rounded-1 text-uppercase' href={'/doctors#' + department.title.toLowerCase().split(' ').join('_')}>Doctors</Link>
                </div>
              </div>
            </div>
          })}
        </div>
      </section>
    </div>
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <hr />
            <h2 className='heading-secondary text-tertiary mt-5'>{page[0].pageACF.sectionHeading}</h2>
            <p>{page[0].pageACF.sectionDescription}</p>
          </div>
        </div>
      </div>
      {/* <FeclitiesList /> */}
      <section className='spacing-100 pt-0' data-aos="fade-up">
        <div className="container">
          <div className="row mt-sm-5 pt-4" >
            {fecilitiesPosts.map((fecili, key) => {
              return <div className="col-xl-6 mb-4" key={key} >
                <div className="box p-sm-4 p-3">
                  <Images
                  placeholder={true}
                    imageurl={fecili.featuredImage.node.sourceUrl}
                    styles={''}
                    quality={80}
                    width={500}
                    height={500}
                    alt={fecili.featuredImage.node.altText}
                    classes={'w-100 d-block rounded-3'}
                  />
                  <h2 className='heading-tertiary text-tertiary mb-2'>{fecili.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: fecili.content }} />
                </div>
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
    {/* SPECIALITIES START */}
    <SectionBanner type="column" background={page[0].specialitiesACF.bottomBannerBackground.node.sourceUrl} heading={page[0].specialitiesACF.bottomBannerHeading} description={page[0].specialitiesACF.bottomBannerDescription} link={page[0].pageACF.ctaButtonUrl} button={page[0].pageACF.ctaButtonLabel} />
    {/* SPECIALITIES END */}
    <SectionBanner background={page[0].featuredImage.node.sourceUrl} heading={page[0].pageACF.ctaBannerHeading} description={page[0].pageACF.ctaBannerDescription} link={page[0].pageACF.ctaButtonUrl} button={page[0].pageACF.ctaButtonLabel} />

  </>)



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
        pages(where: {id: 46}) {
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
            specialitiesACF{
              bottomBannerHeading
              bottomBannerDescription
              bottomBannerBackground{
                node{
                  altText
                  sourceUrl
                }
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



export async function generateMetadata({ params }) {

  const pagedata = await getPageData()
  const pageDataGet = pagedata.data.pages.nodes



  ////console.log(pagedata.data.pages.nodespageDataGet)

  return {
    title: pageDataGet[0].seo.title.replace('api.',''),
    description:pageDataGet[0].seo.metaDesc.replace('api.',''),
    alternates: {
      canonical: pageDataGet[0].seo.opengraphUrl.replace('api.', '').replace(/\/$/, ""),
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


//DEPARTMENT DATA
async function getDepartmentData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
        allDepartments {
          nodes {
            content
            title
            featuredImage {
              node {
                altText
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


//FECILITIES DATA
async function getFecilitiesData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
        allFecilities {
          nodes {
            content
            title
            featuredImage {
              node {
                altText
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
