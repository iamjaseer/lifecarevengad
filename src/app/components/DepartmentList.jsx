import { wordpressGraphQlApiUrl } from "../utils/variables";
import Link from "next/link";
import Images from "./Images";


export default async function DepartmentList() {

  const data = await getDepartmentData()
////console.log(data.data.allDepartments.nodes)
const departmentPosts = data.data.allDepartments.nodes


  return (
    <>
     <section>
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
    </>
  )
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
