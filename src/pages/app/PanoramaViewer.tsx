// /* eslint-disable */
// import { GalleryPlugin, MarkersPlugin, ReactPhotoSphereViewer, VirtualTourPlugin } from 'react-photo-sphere-viewer';

// import pisoPds from '../assets/panoramas/piso_PDs_panorama.jpeg'
// import pisoPdsFundo from '../assets/panoramas/piso_PDs_fundo_panorama.jpeg'
// import areaDregs from '../assets/panoramas/area_dregs.jpeg'

// // import point from '../assets/point.svg'
// import { bb113, bb114, bb218, mx215 } from '../../components/equipamentos';
// import { Viewer } from '@photo-sphere-viewer/core';

// export function PanoramaViewer() {
//   const handleReady = (instance: Viewer) => {
//     const virtualTour = instance.getPlugin(VirtualTourPlugin);
//     if (!virtualTour) return;

//     const makerPisoPds = [{
//       defaultHoverScale: true,
//       id: 'bb113',
//       position: { pitch: 0.05, yaw: -2 },
//       image: "https://www.svgrepo.com/show/292182/pointer-pin.svg",
//       size: { width: 32, height: 32 },
//       anchor: 'top center',
//       tooltip: {
//         content: bb113,
//         className: "bg-transparent",
//         trigger: 'click',
//       }
//     },
//     {
//       defaultHoverScale: true,
//       id: 'bb114',
//       position: { pitch: 0, yaw: -3.6 },
//       image: "https://www.svgrepo.com/show/292182/pointer-pin.svg",
//       size: { width: 32, height: 32 },
//       anchor: 'top center',
//       tooltip: {
//         content: bb114,
//         className: "bg-transparent",
//         trigger: 'click',
//       }
//     }]

//     const makersAreaDregs = [{
//       defaultHoverScale: true,
//       id: 'bb218',
//       position: { textureX: 610, textureY: 200 },
//       image: "https://www.svgrepo.com/show/292182/pointer-pin.svg",
//       size: { width: 32, height: 32 },
//       anchor: 'top center',
//       tooltip: {
//         content: bb218,
//         className: "bg-transparent",
//         trigger: 'click',
//       }
//     },
//     {
//       defaultHoverScale: true,
//       id: 'mx215',
//       position: { textureX: 3420, textureY: 160 },
//       image: "https://www.svgrepo.com/show/292182/pointer-pin.svg",
//       size: { width: 32, height: 32 },
//       anchor: 'top center',
//       tooltip: {
//         content: mx215,
//         className: "bg-transparent",
//         trigger: 'click',
//       }
//     }]

//     //@ts-ignore
//     virtualTour.setNodes(
//       [
//         {
//           id: "1",
//           panorama: pisoPds,
//           name: "Piso dos PD's",
//           // links: [{ nodeId: "2", position:{ textureX: 100, textureY: 0 }}],
//           links: [{ nodeId: "2"}, {nodeId: "3"}],
//           gps: [0, 1],
//           markers: makerPisoPds,
//         },
//         {
//           id: "2",
//           panorama: pisoPdsFundo,
//           name: "Fundo do piso dos PD's",
//           // links: [
//           //   {nodeId: "1", position:{ textureX: 100, textureY: 0 }},
//           //   {nodeId: "3", position:{ textureX: 2500, textureY: 0 }}
//           // ],
//           links: [{ nodeId: "1" }, { nodeId: "3" }],
//           gps: [0, 0],
//           // markers: [markerLighthouse],
//         },
//         {
//           id: "3",
//           panorama: areaDregs,
//           name: "area dos dregs",
//           // links: [{ nodeId: "2", position:{ textureX: -800, textureY: 0 } }],
//           links: [{ nodeId: "2"}, { nodeId: "1"}],
//           gps: [-1, 0],
//           markers: makersAreaDregs,
//         },
//       ],
//       "2",
//     );
//   };

//   const plugins = [
//     MarkersPlugin,
//     [
//       GalleryPlugin,
//       {
//         thumbnailSize: { width: 100, height: 100 },
//       },
//     ],
//     [
//       VirtualTourPlugin,
//       {
//         positionMode: "gps",
//         renderMode: "3d",
//       },
//     ],
//   ];

//   return (
//     <div id={"container-360"}>
//     <ReactPhotoSphereViewer
//       height={'100vh'}
//       width={"100%"}
//       //@ts-ignore
//       plugins={plugins}
//       src={pisoPds}
//       onReady={handleReady}
//       panoData={{
//         isEquirectangular: true,
//         fullWidth: 4000,
//         fullHeight: 2000,
//         croppedWidth: 4000,
//         croppedHeight: 1000,
//         croppedX: 2000,
//         croppedY: 500,
//         poseHeading: 0,
//         posePitch: 0,
//         poseRoll: 0,
//       }}
//       />
//   </div>
//   )
// }
