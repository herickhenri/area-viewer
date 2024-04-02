import { Routes } from '@/routes/routes.tsx'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={2000} limit={3} />
    </>
  )
}
