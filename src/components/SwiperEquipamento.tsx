// import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface SwiperEquipamentoProps {
  image: string,
}

export function SwiperEquipamento({ image }: SwiperEquipamentoProps) {
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
        <SwiperSlide>
          <img 
          className='w-full h-96 object-cover shadow-2xl shadow-black/100'
          src={image} 
          alt="bomba de lama" 
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
          className='w-full h-96 object-cover shadow-2xl shadow-black/100'
          src={image} 
          alt="bomba de lama" 
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
          className='w-full h-96 object-cover shadow-2xl shadow-black/100'
          src={image} 
          alt="bomba de lama" 
          />
        </SwiperSlide>
      </Swiper>

      <Swiper
        loop
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress
        freeMode
        modules={[FreeMode, Navigation, Thumbs]}
      >
        <SwiperSlide>
          <img 
          className='opacity-40 w-full aspect-square object-cover shadow-2xl shadow-black/100'
          src={image} 
          alt="bomba de lama"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
          className='opacity-40 w-full aspect-square object-cover shadow-2xl shadow-black/100'
          src={image} 
          alt="bomba de lama" 
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
          className='opacity-40 w-full aspect-square object-cover shadow-2xl shadow-black/100'
          src={image} 
          alt="bomba de lama" 
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}