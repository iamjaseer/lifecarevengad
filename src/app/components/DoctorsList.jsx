import { wordpressGraphQlApiUrl } from "../utils/variables";
import Images from "./Images";

export default async function DoctorsList() {


  const data = await getDoctorsData()
  ////console.log(data.data.doctors.nodes)
  const doctorsPosts = data.data.doctors.nodes



  const departmentCat = async (id) => {


    const res = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
            categories(where: { termTaxonomId: `+ id + `}) {
              nodes {
                name
                description
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


    const dat_ = await res.json()


    ////console.log(dat_.data.categories.nodes[0].name)

    return dat_.data.categories.nodes[0].name


  }


  const departmentCatDescription = async (id) => {



    const res = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
          categories(where: { termTaxonomId: `+ id + `}) {
            nodes {
              name
              description
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


    const dat_ = await res.json()


    ////console.log(dat_.data.categories.nodes[0].description)

    return dat_.data.categories.nodes[0].description

  }

  return (
    <>
      <section className='spacing-100 pt-0 text-tertiary pt-sm-5 mt-sm-5'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {doctorsPosts.map((doctor, key) => {
                return (<>
                  <div className="sticky-column clearfix" id={doctor.doctorACF.id} key={key} data-aos="fade-up">
                    <div className="left sticky">
                      <h2 className='heading-secondary text-tertiary text-capitalize'>{departmentCat(doctor.categories.nodes[0].termTaxonomyId)} </h2>
                      <p className='mt-3'>{departmentCatDescription(doctor.categories.nodes[0].termTaxonomyId)}</p>
                    </div>
                    <div className="right">
                      <div className="box mb-5">
                      <Images
                      placeholder={true}
                    imageurl={doctor.featuredImage.node.sourceUrl}
                    styles={''}
                    quality={80}
                    width={250}
                    height={250}
                    alt={doctor.featuredImage.node.altText}
                    classes={'doctor-photo d-block w-100 mx-auto'}
                    />
 <h3 className='heading-tertiary'>{doctor.title}</h3>
                        <span className='time'>{doctor.doctorACF.time}</span>
                        <div dangerouslySetInnerHTML={{ __html: doctor.content }} />
                      </div>
                    </div>
                  </div>
                </>)
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


//DOCTORS DATA
async function getDoctorsData() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
        doctors {
          nodes {
            title
            content
           
           categories{
            nodes{
              taxonomyName
              termTaxonomyId
             }
          }
            featuredImage {
              node {
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
      cache: 'force-cache',
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}




