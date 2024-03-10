import { PanoramaConnectForm } from '@/components/panorama-connect-form'

export function PanoramaCreateConnection() {
  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Conectar panoramas
      </h1>
      <PanoramaConnectForm />
    </div>
  )
}
