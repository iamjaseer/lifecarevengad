
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import { wordpressGraphQlApiUrl } from "../utils/variables";





export default async function ContactInfo() {

    const pagedata = await getPageData()
////console.log(pagedata.data.allContactInfos.edges[0].node)
const contactInfos = pagedata.data.allContactInfos.edges[0].node


    return (
        <>
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
  