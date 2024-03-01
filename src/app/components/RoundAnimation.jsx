'use client'

import Image from 'next/image';
import { ParallaxProvider, Parallax, ParallaxBanner } from 'react-scroll-parallax';


export default function RoundAnimation() {
    return (<>
        <ParallaxProvider>
            <Parallax translateY={[50, 0]} className="round d-none d-xl-block">
                <Image width='500' height='500' src="images/round.svg" className='d-block' alt="Round" />
            </Parallax>
        </ParallaxProvider>
    </>)
}


