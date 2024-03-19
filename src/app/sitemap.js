import {frontendUrl, wordpressGraphQlApiUrl} from './utils/variables'


const pageData_ = await getPages()
const pageData = pageData_.data.pages.nodes;


const postData_ = await getPosts()
const postData = postData_.data.posts.nodes;
 
export default async function sitemap() {

  const posts = postData.map((item) => ({
    url: `${frontendUrl}/blogs/${item.slug}`,
    //lastModified:  `${item.modified}-0000`,
  }));

 
  const routes = pageData.map((item) => ({
    url: (frontendUrl+'/'+item.slug.replace('home','')).replace(/([^:]\/)\/+/g, "$1").replace(/\/+$/, ''),
    //lastModified:  `${item.modified}-0000`,
  }));
 
  return [...routes, ...posts];
}






//SITEMAP API POSTS
async function getPosts() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `  query Posts {
        posts {
          nodes{
             title
             link
             slug
             modified
             author{
               node{
                 name
                 databaseId
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


//SITEMAP API PAGES
async function getPages() {

  const res = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `  query Posts {
        pages {
          nodes{
             title
             link
             slug
             modified
             author{
               node{
                 name
                 databaseId
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

