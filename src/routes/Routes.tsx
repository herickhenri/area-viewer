import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Admin } from '@/pages/admin'
import { AdminLayout } from '@/pages/_layouts/admin'
import { AppLayout } from '@/pages/_layouts/app'
import { EquipmentList } from '@/pages/admin/equipment-list'
import { EquipmentCreate } from '@/pages/admin/equipment-create'
import { EquipmentCreated } from '@/pages/admin/equipment-created'
import { EquipmentEdit } from '@/pages/admin/equipment-edit'
import { PanoramaCreate } from '@/pages/admin/panorama-create'
import { PanoramaList } from '@/pages/admin/panorama-list'
import { PanoramaEdit } from '@/pages/admin/panorama-edit'
import { EquipmentsFeed } from '@/pages/app/equipments-feed.tsx'
import { EquipmentDetails } from '@/pages/app/equipment-details'

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <EquipmentsFeed />,
        },
        {
          path: 'equipment/:id',
          element: <EquipmentDetails />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: '',
          element: <Admin />,
        },
        {
          path: 'equipment/list',
          element: <EquipmentList />,
        },
        {
          path: 'equipment/create',
          element: <EquipmentCreate />,
        },
        {
          path: 'equipment/created/:id',
          element: <EquipmentCreated />,
        },
        {
          path: 'equipment/edit/:id',
          element: <EquipmentEdit />,
        },
        {
          path: 'panorama/list',
          element: <PanoramaList />,
        },
        {
          path: 'panorama/create',
          element: <PanoramaCreate />,
        },
        {
          path: 'panorama/edit/:id',
          element: <PanoramaEdit />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
