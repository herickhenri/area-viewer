import { GalleryPlugin, MarkersPlugin, ReactPhotoSphereViewer, VirtualTourPlugin } from 'react-photo-sphere-viewer';

import pisoPds from '../assets/piso_PDs_panorama.jpeg'
import pisoPdsFundo from '../assets/piso_PDs_fundo_panorama.jpeg'
import point from '../assets/point.svg'
import { bb113, bb114 } from '../components/equipamentos';
import { Viewer } from '@photo-sphere-viewer/core';

export function PanoramaViewer() {
  const handleReady = (instance: Viewer) => {
    const virtualTour = instance.getPlugin(VirtualTourPlugin);
    if (!virtualTour) return;

    const makerPisoPds = [{
      defaultHoverScale: true,
      id: 'bb113',
      position: { pitch: 0.05, yaw: -2 },
      image: point,
      size: { width: 32, height: 32 },
      anchor: 'top center',
      tooltip: {
        content: bb113,
        className: "bg-transparent",
        trigger: 'click',
      }
    },
    {
      defaultHoverScale: true,
      id: 'bb114',
      position: { pitch: 0, yaw: -3.6 },
      image: point,
      size: { width: 32, height: 32 },
      anchor: 'top center',
      tooltip: {
        content: bb114,
        className: "bg-transparent",
        trigger: 'click',
      } 
  }]
    virtualTour.setNodes(
      [
        {
          id: "1",
          panorama: pisoPds,
          name: "Piso dos PD's",
          links: [{ nodeId: "2", position:{ textureX: 100, textureY: 0 }}],
          markers: makerPisoPds,
        },
        {
          id: "2",
          panorama: pisoPdsFundo,
          name: "Fundo do piso dos PD's",
          links: [{ nodeId: "1", position:{ textureX: -100, textureY: 0 } }],
          // markers: [markerLighthouse],
        },
      ],
      "2",
    );
  };

  const plugins = [
    MarkersPlugin,
    [
      GalleryPlugin,
      {
        thumbnailSize: { width: 100, height: 100 },
      },
    ],
    [
      VirtualTourPlugin,
      {
        renderMode: "3d",
      },
    ],
  ];

  return (
    <div id={"container-360"}>
    <ReactPhotoSphereViewer
      height={'100vh'}
      width={"100%"}
      plugins={plugins}
      src={pisoPds}
      onReady={handleReady}
      panoData={{
        isEquirectangular: true,
        fullWidth: 4000,
        fullHeight: 2000,
        croppedWidth: 4000,
        croppedHeight: 1000,
        croppedX: 2000,
        croppedY: 500,
        poseHeading: 0,
        posePitch: 0,
        poseRoll: 0,
      }}
      />
  </div>
  )
}