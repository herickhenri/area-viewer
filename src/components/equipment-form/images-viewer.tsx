import * as Dialog from '@radix-ui/react-dialog'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface imageViewerProps {
  selectedSource: string
  sources: string[]
  onImageViewer: boolean
  changeOnImageViewer: (open: boolean) => void
}

export function ImagesViewer({
  selectedSource,
  sources,
  onImageViewer,
  changeOnImageViewer,
}: imageViewerProps) {
  const initialSlide = sources.findIndex((source) => source === selectedSource)
  return (
    <Dialog.Root open={onImageViewer} onOpenChange={changeOnImageViewer}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/25" />
        <Dialog.Content className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none">
          <Swiper
            className="max-h-[80vh] max-w-[80vw]"
            navigation={true}
            loop
            modules={[Pagination, Navigation]}
            initialSlide={initialSlide}
          >
            {sources.map((source, index) => (
              <SwiperSlide
                className="flex max-h-[80vh] w-full select-none items-center justify-center"
                key={`${source}-${index}`}
              >
                <img
                  className="h-[80vh] w-auto object-contain"
                  src={source}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
