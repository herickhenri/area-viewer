import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { App } from "../pages/App"
import { PanoramaViewer } from "../pages/PanoramaViewer"
import { Viewer360 } from "../pages/Viewer360"
import { DetalhesEquipamento } from "../pages/DetalhesEquipamento"
import { AddPanorama } from "../pages/AddPanorama"
import { AreaMap } from "../pages/AreaMap"
import { Admin } from "../pages/Admin"

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />
    },
    {
      path: 'viewer',
      element: <PanoramaViewer />
    },
    {
      path: 'casa360',
      element: <Viewer360 />
    },
    {
      path: 'equipamento/:tag',
      element: <DetalhesEquipamento />
    },
    {
      path: 'add-panorama',
      element: <AddPanorama />
    },
    {
      path: 'mapa-area',
      element: <AreaMap />
    },
    {
      path: 'admin',
      element: <Admin />
    },
  ])
  
  return (
    <RouterProvider router={router}/>
  )
}