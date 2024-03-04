'use client'

import { ParallaxProvider, Parallax, ParallaxBanner } from 'react-scroll-parallax';
import Images from './Images';


export default function RoundAnimation() {
    return (<>
        <ParallaxProvider>
            <Parallax translateY={[50, 0]} className="round d-none d-xl-block">
            <Images
            placeholder={false}
                  imageurl={'images/round.svg'}
                  styles={''}
                  quality={100}
                  width={'500'}
                  height={'500'}
                  alt={'Round'}
                  classes={'d-block'}
                />
            </Parallax>
        </ParallaxProvider>
    </>)
}


