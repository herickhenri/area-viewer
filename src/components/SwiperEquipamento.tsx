// import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface SwiperEquipamentoProps {
  photos: {
    source: string,
    name: string
  }[]
}

export function SwiperEquipamento({ photos }: SwiperEquipamentoProps) {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className='w-full md:w-80'>
      <Swiper
        loop
        spaceBetween={10}
        navigation
        // thumbs={{swiper: thumbsSwiper}}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mb-4'
      >
        {photos.map((photo, key) => (
        <SwiperSlide>
          <img
          key={key}
          className='w-full h-96 object-cover shadow-2xl shadow-black/100'
          src={photo.source} 
          alt={photo.name} 
          />
        </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        loop
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress
        freeMode
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {photos.map((photo, key) => (
          <SwiperSlide>
            <img
            key={key}
            className='opacity-40 w-full aspect-square object-cover shadow-2xl shadow-black/100'
            src={photo.source} 
            alt={photo.name} 
            />
          </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}