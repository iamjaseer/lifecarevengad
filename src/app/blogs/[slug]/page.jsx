
import Images from "@/app/components/Images";
import { wordpressGraphQlApiUrl } from "../../utils/variables";


export async function generateStaticParams() {



  const { data } = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
    query Posts {
        posts {
            nodes {
                slug
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
  ).then((res) => res.json());



  let blogPosts = data.posts.nodes



  return blogPosts.map((post) => ({
    slug: post.slug,
  }))



}






export default async function BlogsSinglePage({ params }) {


  let { slug } = params





  function formatBlogDate(date_) {

    let formattedDate = new Date(date_).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: "2-digit",
      minute: "2-digit",
      hour12: false

    })

    return formattedDate

  }



  const { data } = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        `query Posts {
          posts(where: {name: "`+ slug + `"}) {
              nodes {
                databaseId
                title
                id
                date
                slug
                content
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
  },
    {
      cache: 'force-cache',
      cache: 'no-store'
    }
  ).then(res => res.json())

  let blogPosts = data.posts.nodes

////console.log(blogPosts[0].featuredImage.node.sourceUrl)

  return (
    <>
      <section className="spacing-100">
        <div className="container">
          <div className="col-12">
            <h1 className='heading-secondary text-tertiary'>{blogPosts[0].title}</h1>
            <p className='text-small text-primary my-4'>{formatBlogDate(blogPosts[0].date)}</p>
     
            <Images
            placeholder={true}
                    imageurl={blogPosts[0].featuredImage.node.sourceUrl}
                    styles={''}
                    quality={80}
                    width={1000}
                    height={600}
                    alt={blogPosts[0].featuredImage.node.altText}
                    classes={'w-100 d-block rounded-4 cover-image'}
                    />
 <div className="mt-5 blog-content" dangerouslySetInnerHTML={{ __html: blogPosts[0].content }} />
          </div>
        </div>
      </section>

    </>
  )
}





export async function generateMetadata({ params }) {


  const { slug } = params

  // //console.log(slug)

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `  query Posts {
           posts(where: {name: "`+ slug + `"}) {
          nodes {
            title
            
            featuredImage {
              node {
                altText
                sourceUrl
              }
              
            }
              pageACF {
                about
                sectionDescription
                sectionHeading
                subHeading
              ctaBannerHeading
              ctaBannerDescription
              ctaButtonLabel
              ctaButtonUrl
                 
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

  const test = res.json()

  const pagedata = await test
  const pageDataGet = pagedata.data.posts.nodes



  ////console.log(pagedata.data.posts.nodes)


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
  }
}