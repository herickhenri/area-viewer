import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

import casa360 from '../assets/casa_360.jpg'

export function Viewer360() {
  return (
    <div>

    <ReactPhotoSphereViewer
    height={'100vh'}
    width={"100%"}
    src={casa360}
    />
    </div>
  )
}