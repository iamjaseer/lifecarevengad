
import { wordpressGraphQlApiUrl  } from "../utils/variables";
import Slider from "./Slider";


export default async function Doctors(props) {




  const { data } = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        `query Posts {
          doctors {
              nodes {
                title
                categories {
                  edges {
                  node {
                    termTaxonomyId
                    description
                  }
                }
                }
                featuredImage {
                  node {
                    mediaDetails {
                      height
                      width
                    }
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
    `
    }),
    next: { revalidate: 10 }
  }).then(res => res.json())

  let doctorsPosts = data.doctors.nodes

  //console.log(footerPosts.content)

  return (
      <Slider controls={false} indicators={false} autoPlay={true} interval="2000" touch="true" data={doctorsPosts}/>
  )
}




