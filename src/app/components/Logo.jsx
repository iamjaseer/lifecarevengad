import Link from 'next/link';
import Image from 'next/image';



function Logo(props) {

    const {
        url,
        alt
    } = props

    return (<>
<Link aria-label="Logo" href="/">
            <Image width='350' height='45' src={url} alt={alt} className='logo d-block w-100' />
        </Link>
    </>)


}


export default Logo
