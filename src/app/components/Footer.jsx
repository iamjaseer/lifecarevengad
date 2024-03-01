import Link from "next/link";
import getURL from "../../app/homeUrl";
import { wordpressGraphQlApiUrl } from "../utils/variables";
import { logoUrl, logoAlt } from "../utils/LogoApi";
import Logo from "./Logo";

export default async function Footer() {



  const date = new Date();
  const year = date.getFullYear();


  const pagedata = await getPageData()
  //console.log(pagedata.data.pages.edges[0].node)
  const footerPosts = pagedata.data.allContactInfos.edges[0].node


  return (
    <>
      <footer className="spacing-100">
        <div className="container mb-sm-5 mb-2">
          <div className="row mb-sm-5 mb-2">
            <div className="col-md-4">
              <Logo url={logoUrl} alt={logoAlt} />
              <div className="mt-5" dangerouslySetInnerHTML={{ __html: footerPosts.content }} />
              <ul className="list-inline social mt-4 mb-4 mb-md-0">
                <li className={footerPosts.contactInfoAcf.facebook == null ? 'd-none' : 'list-inline-item'}>
                  <Link aria-label="Facebook" href={footerPosts.contactInfoAcf.facebook == null ? '' : footerPosts.contactInfoAcf.facebook} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>
                  </Link>
                </li>
                <li className={footerPosts.contactInfoAcf.instagram == null ? 'd-none' : 'list-inline-item'}>
                  <Link aria-label="Instagram" href={footerPosts.contactInfoAcf.instagram == null ? '' : footerPosts.contactInfoAcf.instagram} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg></Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8 d-sm-flex align-items-start justify-content-md-end">
              <div className="me-5 pe-xl-5 mt-2 mt-sm-0">
                <h3 className="mb-3 h4">Explore</h3>
                <Link aria-label="Home" href={getURL("/")} className="mb-2">Home</Link>
                <Link aria-label="Doctors" href={getURL("/doctors")} className="mb-2">Doctors</Link>
                <Link aria-label="Specialties" href={getURL("/specialties")} className="mb-2">Specialties</Link>
                <Link aria-label="Blog" href={getURL("/blogs")} className="mb-2">Blog</Link>
                <Link aria-label="Appointment" href={getURL("/appointment")}>Appointment</Link>
              </div>
              <div className='mt-4 mt-sm-0 pt-1 pt-sm-0'>
                <h3 className="mb-3 h4">Contact Us</h3>
                <p href="" className="mb-2">
                  {footerPosts.contactInfoAcf.address}
                </p>
                <Link aria-label="Phone" href={footerPosts.contactInfoAcf.phone !== null ? '' : footerPosts.contactInfoAcf.phone} className="mb-2">
                  {footerPosts.contactInfoAcf.phone}
                </Link>
                <Link aria-label="Email" href={footerPosts.contactInfoAcf.email !== null ? '' : footerPosts.contactInfoAcf.email} className="mb-2">
                  {footerPosts.contactInfoAcf.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-sm-5 mt-3" />
        <div className="container mt-sm-5 mt-4">
          <div className="row">
            <div className="col-12 text-sm-center">
              <p>© Life care clinic. All Rights Reserved {year}.</p>
            </div>
          </div>
        </div>
      </footer>
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
        allContactInfos {
          edges {
            node {
              content
              contactInfoAcf {
                address
                email
                facebook
                fieldGroupName
                instagram
                phone
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
