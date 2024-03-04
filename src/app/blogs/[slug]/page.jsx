import Image from "next/image";
import { wordpressGraphQlApiUrl  } from "../../utils/variables";


// this should run in server
// Return a list of `params` to populate the [slug] dynamic segment
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
}).then((res) => res.json());



let blogPosts = data.posts.nodes
 


  return blogPosts.map((post) => ({
    slug: post.slug,
  }))

  
}



export default async function BlogsSinglePage({ params }) {


  const { slug } = params


  



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
  }).then(res => res.json())

  let blogPosts = data.posts.nodes

//console.log(data.posts.nodes[0].title)

  return (
    <>
    
        <section className="spacing-100 mt-5">
          <div className="container mt-sm-5">
            <div className="col-12">
              <h1 className='heading-secondary text-tertiary'>{blogPosts[0].title}</h1>
              <p className='text-small text-primary my-4'>{formatBlogDate(blogPosts[0].date)}</p>
              <Image width='1000' height='600' src={blogPosts[0].featuredImage.node.sourceUrl} className='w-100 d-block rounded-4 cover-image' alt={blogPosts[0].featuredImage.node.altText} />
              <div data-aos="fade-up" className="mt-3 blog-content" dangerouslySetInnerHTML={{ __html: blogPosts[0].content }} />
            </div>
          </div>
        </section>
    

    </>
  )
}



