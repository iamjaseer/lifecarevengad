'use client'

import Carousel from 'react-bootstrap/Carousel';
import Link from "next/link";
import Images from './Images';


export default function Slider(props) {

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
                <Images
                placeholder={true}
                  imageurl={doctor.featuredImage.node.sourceUrl}
                  styles={''}
                  quality={80}
                  width={doctor.featuredImage.node.mediaDetails.width}
                  height={doctor.featuredImage.node.mediaDetails.height}
                  alt={doctor.featuredImage.node.altText}
                  classes={'d-block w-100 doctor-photo mx-auto'}
                />
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
