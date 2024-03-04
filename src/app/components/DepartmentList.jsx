import Image from "next/image";
import { wordpressGraphQlApiUrl } from "../utils/variables";
import Link from "next/link";


export default async function DepartmentList() {


    const { data } = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query:
            `query Posts {
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
          `
        }),
        next: { revalidate: 10 }
      }).then(res => res.json())
  
      let departmentPosts = data.allDepartments.nodes
  
      //console.log(data.posts.nodes[0].title)



  return (
    <>
     <section>
        <div className="container">
          {departmentPosts.map((department, key) => {
            return <div className="row spacing-100 pt-0" key={key} >
              <div className="col-xl-5 mb-3 mb-xl-0">
                <Image width='500' height='500' src={department.featuredImage.node.sourceUrl} className='w-100 d-block rounded-4' alt={department.featuredImage.node.altText} />
              </div>
              <div className="col-xl-7 d-flex align-items-center justify-content-center">
                <div className="ps-xl-5">
                  <h3 className='heading-secondary text-tertiary mb-2'>{department.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: department.content }} />
                  <Link aria-label="Doctors" className='mt-3 btn btn-outline-primary  px-4 py-3 rounded-1 text-uppercase' href={'/doctors#' + department.title.toLowerCase().split(' ').join('_')}>Doctors</Link>
                </div>
              </div>
            </div>
          })}
        </div>
      </section>
    </>
  )
}
