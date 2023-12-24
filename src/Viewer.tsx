import { MarkersPlugin, ReactPhotoSphereViewer, } from 'react-photo-sphere-viewer';

import casa360 from './assets/casa_360.jpg'
import point from './assets/point.png'

export function Viewer() {
  const plugins = [
    [MarkersPlugin, {
      markers: [{
          id: 'custom-tooltip',
          position: { pitch: 0.22, yaw: -0.35 },
          image: point,
          size: { width: 16, height: 16 },
          anchor: 'bottom center',
          tooltip: {
            content: `    
            <div class="bg-red-500 p-5">
              <h1>Fio do poste</h1>
              <p>Este fio é o fio de um poste muito postil que passa energia eletrica</p>
            </div>`,
            trigger: 'click',
          } 
      }],
    }],
  ]

  return (
    <div>
    <ReactPhotoSphereViewer
      height={'100vh'}
      width={"100%"}
      plugins={plugins}
      src={casa360}

      />
  </div>
  )
}