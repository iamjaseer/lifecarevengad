import Image from 'next/image'
import React from 'react'
import RoundAnimation from './RoundAnimation'


export default function  MissionVision(props){

    const {
        image,
         alt,
        missionheading,
        missiondesc,
        visionheading,
        visiondesc
        } = props

  return (
    <>
    <section className="mission h-half d-flex align-items-center justify-content-center overflow-hidden position-relative">
          <div className="container spacing-150">
            <div className="row">
              <div className="col-xl-4">
                <Image
                quality={80} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
                width='500' height='500'
                  src={image}
                  className='rounded-5 d-block w-100'
                  alt={alt}
                  
                />
              </div>
              <div className="col-xl-5 offset-xl-1 d-flex align-items-center mt-5 mt-xl-0">
                <div>
                  <h3
                    className='heading-tertiary mb-3 text-tertiary'
                     
                  >{missionheading} </h3>
                  <p
                    className='text-tertiary'
                     
                  >{missiondesc}</p>
                  <h3
                    className='heading-tertiary mt-5 mb-3 text-tertiary'
                     
                  >{visionheading} </h3>
                  <p className='text-tertiary'
                     
                  >{visiondesc} </p>
                </div>
              </div>
            </div>
          </div>
          <RoundAnimation />
        </section>
    </>
  )
}
