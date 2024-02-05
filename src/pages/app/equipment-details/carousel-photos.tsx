import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

interface carouselPhotosProps {
  sources: string[]
}

export function CarouselPhotos({ sources }: carouselPhotosProps) {
  return (
    <div className="flex gap-3 md:max-w-[30vw]">
      <Swiper
        className="aspect-square w-full"
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation]}
      >
        {sources.map((source) => (
          <SwiperSlide key={source} className="overflow-hidden">
            <img src={source} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
