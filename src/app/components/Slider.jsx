'use client'

import Carousel from 'react-bootstrap/Carousel';
import Image from "next/image";
import Link from "next/link";


export default function Slider(props)  {

    const {
        controls,
        indicators,
        autoPlay,
        interval,
        touch,
        data
     } = props
  return (
    <>
     <Carousel controls={controls} indicators={indicators} autoPlay={autoPlay} interval={interval} touch={touch}>

      {data.map((doctor, key) => {
        return <Carousel.Item key={key}>
          <>
            <Link aria-label="Doctor" href={'doctors#' + doctor.doctorACF.id}>
              <Image width={doctor.featuredImage.node.mediaDetails.width} height={doctor.featuredImage.node.mediaDetails.height} src={doctor.featuredImage.node.sourceUrl} className='d-block w-100 doctor-photo mx-auto' alt={doctor.featuredImage.node.altText} />
              <div className="text-center pt-4">
                <h3 className='h6 text-tertiary text-capitalize'>{doctor.title}</h3>
                <p className='p text-tertiary text-capitalize'>{doctor.doctorACF.id.replace(/_/g, " ")}</p>
              </div>
            </Link>
          </>

        </Carousel.Item>;
      })}
    </Carousel>
    </>
  )
}
