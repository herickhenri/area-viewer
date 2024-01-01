import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { App } from "../pages/App"
import { PanoramaViewer } from "../pages/PanoramaViewer"
import { Viewer360 } from "../pages/Viewer360"
import { DetailsEquipamento } from "../pages/DetailsEquipamento"
import { AddPanorama } from "../pages/AddPanorama"
import { AreaMap } from "../pages/AreaMap"
import { Admin } from "../pages/Admin"
import { AddEquipamento } from "../pages/AddEquipamento"

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
      element: <DetailsEquipamento />
    },
    {
      path: 'admin',
      element: <Admin />
    },
    {
      path: 'admin/add-panorama',
      element: <AddPanorama />
    },
    {
      path: 'admin/mapa-area',
      element: <AreaMap />
    },
    {
      path: 'admin/add-equipamento',
      element: <AddEquipamento />,
    },
  ])
  
  return (
    <RouterProvider router={router}/>
  )
}