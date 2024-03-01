import { wordpressGraphQlApiUrl } from "./variables"



const LogoApi = async () =>  {


    const { data } = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query:
          `query Posts {
            mediaItems(where: {name: "site-logo"}) {
              nodes {
                altText
                sourceUrl
              }
            }
          }
      `
      }),
      next: { revalidate: 10 }
    }).then(res => res.json())
  
    const headerPost = data.mediaItems.nodes[0]


     const logoUrl = data.mediaItems.nodes[0].sourceUrl
    const logoAlt = data.mediaItems.nodes[0].altText
   // console.log(headerPost)
    return [logoUrl, logoAlt]
    //console.log(headerPost)


  //return headerPost


  }


  const logoData = await  LogoApi()
  export const logoUrl = logoData[0]
  export const logoAlt = logoData[1]

//console.log(logoData[1]+'----asdadadasd')


 

 

