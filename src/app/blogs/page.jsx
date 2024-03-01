
import Link from "next/link";
import Image from 'next/image'
import SectionBanner from "../components/SectionBanner";
import { wordpressGraphQlApiUrl  } from "../utils/variables";







function formatBlogDate(params) {

  let formattedDate = new Date(params).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: "2-digit",
      minute: "2-digit",
      hour12: false

  })

  return formattedDate

}



export default async function AllBlogPosts(props) {


  const pagedata = await getPageData()
  const page = pagedata.data.pages.nodes

  const blogData = await getBlogs()
  const blogPosts = blogData.data.posts.nodes

console.log(blogPosts[0])

  return (
      <>
    
          {/* PAGE TITLE START */}
          <SectionBanner type="page-heading" background={page[0].featuredImage.node.sourceUrl} heading={page[0].title} />
          {/* PAGE TITLE  END */}
          <section className='spacing-100 pt-0'>
              <div className="container">
                  <div className="row mt-5 pt-4" >
                      {blogPosts.map((blog, key) => {
                          return <div className="col-xl-6 mb-4" data-aos="fade-up" key={key}>
                              <div className="box p-sm-4 p-3">
                                  <Link aria-label="Blog" href={'blogs/' + blog.slug}>
                                    {blog.featuredImage == null ? <Image style={{opacity: 0.6}} quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC" width='400' height='400' src='/images/placeholder-1-1.webp' className='w-100 d-block rounded-3' alt="No image available" /> :    <Image quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC" width='400' height='400' src={blog.featuredImage.node.sourceUrl} className='w-100 d-block rounded-3' alt={blog.featuredImage.node.altText} />}
                                      <h3 className='heading-box text-tertiary mb-2'>{blog.title}</h3>
                                      <p className='text-small text-primary mt-3'>{formatBlogDate(blog.date)}</p>
                                  </Link>
                              </div>
                          </div>
                      })}
                  </div>
              </div>
          </section>
   
      </>
  );
}




//ALL BLOGS
async function getBlogs() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `  query Posts {
        posts(first: 5) {
          nodes {
              databaseId
            title
             date
             slug
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



//PAGE QUERY
async function getPageData() {

  const res = await fetch(wordpressGraphQlApiUrl,  {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
      query: ` query Posts {
        pages(where: {id: 1179}) {
          nodes {
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
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
  cache: 'force-cache' ,
  cache: 'no-store'
}
)

if (!res.ok) {
  throw new Error('Failed to fetch data')
}

return res.json()
}



export async function generateMetadata() {

  const pagedata = await getPageData()
  const pageDataGet = pagedata.data.pages.nodes

  console.log(pagedata.data.pages.nodespageDataGet)

  return {
    title: pageDataGet[0].seo.title.replace('api.',''),
    description:pageDataGet[0].seo.metaDesc.replace('api.',''),
    alternates: {
      canonical: pageDataGet[0].seo.canonical.replace('api.',''),
    },
    openGraph: {
      description: pageDataGet[0].seo.metaDesc.replace('api.',''),
      siteName: pageDataGet[0].seo.opengraphSiteName.replace('api.',''),
      url: pageDataGet[0].seo.opengraphUrl.replace('api.',''),
      images: pageDataGet[0].seo.opengraphImage.sourceUrl.replace('api.',''),
      locale: 'en_US',
      type: pageDataGet[0].seo.opengraphType.replace('api.',''),
      articleModifiedTime: pageDataGet[0].seo.opengraphModifiedTime.replace('api.',''),

    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: 'Life Care Clinic - Your Best clinic in vengad!',
    //   description: 'Looking for the best clinic in Vengad? Experience top-quality care at Life Care Clinic. Your health is our priority',
    //    images: ['https://lifecarevengad.com/wp-content/uploads/2024/02/doctor-2.webp'],
    // },
  }
}