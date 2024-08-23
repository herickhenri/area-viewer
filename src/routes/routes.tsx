import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Admin } from '@/pages/admin'
import { AdminLayout } from '@/pages/_layouts/admin'
import { AppLayout } from '@/pages/_layouts/app'
import { EquipmentList } from '@/pages/admin/equipment-list'
import { EquipmentCreate } from '@/pages/admin/equipment-create'
import { EquipmentEdit } from '@/pages/admin/equipment-edit'
import { PanoramaCreate } from '@/pages/admin/panorama-create'
import { PanoramaList } from '@/pages/admin/panorama-list'
import { PanoramaEdit } from '@/pages/admin/panorama-edit'
import { EquipmentsFeed } from '@/pages/app/equipments-feed'
import { EquipmentDetails } from '@/pages/app/equipment-details'
import { EquipmentInfo } from '@/pages/admin/equipment-info'
import { PanoramasFeed } from '@/pages/app/panoramas-feed'
import { PanoramaViewer } from '@/pages/app/panorama-viewer'
import { PanoramaInfo } from '@/pages/admin/panorama-info'
import { PanoramaConnect } from '@/pages/admin/panorama-connect'
import { PageNotFound } from '@/pages/error-404'
import { SubmitNotes } from '@/pages/admin/submit-notes'
import { NotesFeed } from '@/pages/app/notes-feed'
import { NoteMark } from '@/pages/admin/note-mark'
import { NotesList } from '@/pages/admin/notes-list'
import { ModuleGraph } from '@/pages/module-graph'

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/module-graph',
      element: <ModuleGraph />,
    },
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
        {
          path: 'panoramas',
          element: <PanoramasFeed />,
        },
        {
          path: 'notes',
          element: <NotesFeed />,
        },
      ],
    },
    {
      path: 'panoramas/viewer',
      element: <PanoramaViewer />,
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
          path: 'equipment/info/:id',
          element: <EquipmentInfo />,
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
          path: 'panorama/edit',
          element: <PanoramaEdit />,
        },
        {
          path: 'panorama/info/:id',
          element: <PanoramaInfo />,
        },
        {
          path: 'panorama/connections',
          element: <PanoramaConnect />,
        },
        {
          path: 'notes/submit',
          element: <SubmitNotes />,
        },
        {
          path: 'notes/list',
          element: <NotesList />,
        },
        {
          path: 'notes/mark',
          element: <NoteMark />,
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ])

  return <RouterProvider router={router} />
}
