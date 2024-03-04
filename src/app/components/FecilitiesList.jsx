import Image from "next/image";
import { wordpressGraphQlApiUrl } from "../utils/variables";
import Link from "next/link";


export default async function FecilitiesList() {

    const { data } = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query:
            `query Posts {
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
    
          `
        }),
        next: { revalidate: 10 }
      }).then(res => res.json())
  
      let fecilitiesPosts = data.allFecilities.nodes
  
      //console.log(data.posts.nodes[0].title)



  return (
    <>
     <section className='spacing-100 pt-0'>
        <div className="container">
           <div className="row mt-sm-5 pt-4" >
            {fecilitiesPosts.map((fecili, key) => {
              return <div className="col-xl-6 mb-4" key={key} >
                <div className="box p-sm-4 p-3">
                  <Image width='500' height='500' src={fecili.featuredImage.node.sourceUrl} className='w-100 d-block rounded-3' alt={fecili.featuredImage.node.altText} />
                  <h3 className='heading-tertiary text-tertiary mb-2'>{fecili.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: fecili.content }} />
                </div>
              </div>
            })}
          </div>
        </div>
      </section>
    </>
  )
}
