
import { wordpressGraphQlApiUrl  } from "../utils/variables";
import Slider from "./Slider";


export default async function Doctors(props) {


  const data = await getDoctorsData()
  //console.log(data.data.doctors.nodes)
  const dataGet = data.data.doctors.nodes


  return (
      <Slider controls={false} indicators={false} autoPlay={true} interval="2000" touch="true" data={dataGet}/>
  )
}



//DOCTORS DATA
async function getDoctorsData() {

  const res = await fetch(wordpressGraphQlApiUrl,  {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
      query: ` query Posts {
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
`,
  }),
  next: { revalidate: 10 },
},
{
  cache: 'force-cache' ,
  cache: 'no-store'
}
)

if (!res.ok) {
  throw new Error('Failed to fetch data')
}

return res.json()
}



