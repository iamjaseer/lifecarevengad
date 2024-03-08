import Link from 'next/link';
import Images from './Images';

function Logo(props) {

    const {
        url,
        alt
    } = props

    return (<>
        <Link aria-label="Logo" href="/" rel="nofollow">
            <Images
                imageurl={url}
                styles={''}
                quality={100}
                width={'350'}
                height={'45'}
                alt={alt}
                placeholder={false}
                classes={'logo d-block w-100'}
            />
        </Link>
    </>)


}


export default Logo
