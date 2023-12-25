import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/global.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PanoramaViewer } from './routes/PanoramaViewer.tsx'
import { App } from './routes/App.tsx'
import { Viewer360 } from './routes/Viewer360.tsx'

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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
