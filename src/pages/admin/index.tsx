import { CubeTransparent, GearSix, Note } from '@phosphor-icons/react'
import { ButtonAdm } from '@/components/ButtonAdmin'
import { Title } from '@/components/title'

export function Admin() {
  return (
    <div>
      <Title>Página admnistrativa</Title>

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
        <div className="my-5 h-px w-full bg-black" />

        <ButtonAdm content="Subir notas" icon={Note} link={'notes/submit'} />
        <ButtonAdm content="Lista de notas" icon={Note} link={'notes/list'} />
        <ButtonAdm
          content="Marcar nota no panorama"
          icon={Note}
          link={'notes/mark'}
        />
      </div>
    </div>
  )
}
