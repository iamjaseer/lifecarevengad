//import dynamic from "next/dynamic";
import Link from "next/link";
import RoundAnimation from "../components/RoundAnimation";
import { wordpressGraphQlApiUrl } from "../utils/variables";
import ContactForm from "../components/ContactForm";
//import Loading from "../components/Loading";



export default async function Appoinment() {

  const contactdata = await getContactData()
  ////console.log(pagedata.data.allContactInfos.edges[0].node)
  const contactInfos = contactdata.data.allContactInfos.edges[0].node

  // const ContactInfo = dynamic(() => import('../components/ContactInfo'), {
  //   ssr: false,
  //   loading: () => <Loading />
  // });

  return (
    <>
      <section className="spacing-100">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className='heading-secondary text-primary mb-5'>Send us Your feedback!</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="box p-sm-5 d-lg-flex align-items-center justify-content-between" >
                  <h2 className="me-lg-5 text-normal">{contactInfos.contactInfoAcf.apponmentPageTopBoxDescription}</h2>
                  <Link aria-label="Call Us" href={"tel:" + contactInfos.contactInfoAcf.phone} class="btn btn-secondary btn-sm-full py-3 px-3 text-uppercase mt-4 mt-lg-0">Call us {contactInfos.contactInfoAcf.phone}</Link>
                </div>
              </div>
            </div>
            {/* <div className="row my-sm-5 my-4"> */}
            {/* <div className="col-12"> */}
            {/* <h2 className='heading-secondary text-primary' dangerouslySetInnerHTML={{ __html: contactInfos.contactInfoAcf.contactFormHeading }} /> */}
            {/* </div> */}
            {/* </div> */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="box p-sm-5 d-md-flex align-items-center justify-content-between" >
                  <div className="row">
                    <div className="col-xl-4">
                      <p>
                        {contactInfos.contactInfoAcf.contactFormDescription}
                      </p>
                    </div>
                    <div className="col-xl-5 offset-xl-2 mt-4 mt-xl-0">
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RoundAnimation />
      </section>

    </>
  )
}




//CONTACT DATA
async function getContactData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
          allContactInfos {
              edges {
                node {
                  content
                  contactInfoAcf {
                      address
                      email
                      facebook
                      instagram
                      phone
                      apponmentPageTopBoxDescription
                      contactFormDescription
                      contactFormHeading
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
        pages(where: {id: 1110}) {
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