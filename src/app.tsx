import { Routes } from '@/routes/Routes.tsx'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={3000} limit={3} />
    </>
  )
}
