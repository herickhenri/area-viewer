import { CubeTransparent, GearSix } from '@phosphor-icons/react'
import { ButtonAdm } from '@/components/ButtonAdmin'

export function Admin() {
  return (
    <div>
      <h1 className="my-5 text-center text-2xl font-semibold md:text-4xl">
        Página admnistrativa
      </h1>

      <div className="mb-10 flex flex-col items-center gap-5 px-6 md:mx-80">
        <ButtonAdm
          content="Cadastrar Equipamentos"
          icon={GearSix}
          link={'equipment/create'}
        />
        <ButtonAdm
          content="Editar Equipamentos"
          icon={GearSix}
          link={'equipment/list'}
        />

        <div className="my-5 h-px w-full bg-black" />

        <ButtonAdm
          content="Cadastrar Panoramas"
          icon={CubeTransparent}
          link={'panorama/create'}
        />
        <ButtonAdm
          content="Editar Panoramas"
          icon={CubeTransparent}
          link={'panorama/list'}
        />
      </div>
    </div>
  )
}
