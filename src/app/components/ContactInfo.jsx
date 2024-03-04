
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import { wordpressGraphQlApiUrl } from "../utils/variables";





export default async function ContactInfo() {



    const { data } = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query:
                `query Posts {
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
    `
        }),
        next: { revalidate: 10 }
    }).then(res => res.json())

    let contactInfos = data.allContactInfos.edges[0].node

    //console.log(contactInfos)



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="box p-sm-5 d-lg-flex align-items-center justify-content-between" >
                            <p className="me-lg-5">{contactInfos.contactInfoAcf.apponmentPageTopBoxDescription}</p>
                            <Link aria-label="Call Us" href={"tel:" + contactInfos.contactInfoAcf.phone} class="btn btn-secondary btn-sm-full py-3 px-3 text-uppercase mt-4 mt-lg-0">Call us {contactInfos.contactInfoAcf.phone}</Link>
                        </div>
                    </div>
                </div>
                <div className="row my-sm-5 my-4">
                    <div className="col-12">
                        <h2 className="heading-secondary text-primary">{contactInfos.contactInfoAcf.contactFormHeading}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="box p-sm-5 d-md-flex align-items-center justify-content-between" >
                            <div className="row">
                                <div className="col-xl-4">
                                    <p className="text-tertiary">
                                        {contactInfos.contactInfoAcf.contactFormDescription}
                                        <p className="mt-3">Let me know if you have any questions <Link aria-label="Mail Us" href={'mailto:info@lifecare.com'}>info@lifecare.com</Link></p>
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
