'use client'



export default function Aos_(){
    useEffect(() => {

        AOS.init({
             duration: 800,
             once: false,
           })
       
         }, [])

         window.addEventListener('load', AOS.refresh);
}