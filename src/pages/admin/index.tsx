import { Title } from '@/components/title'
import { Gear, GitDiff, Note, Panorama } from '@phosphor-icons/react'
import { QuickAccessLink } from './quick-access-link'

export function Admin() {
  const links = [
    {
      title: 'Criar panoramas',
      icon: Panorama,
      link: 'panorama/create',
      color: '#22c55e',
    },
    {
      title: 'Listar panoramas',
      icon: Panorama,
      link: 'panorama/list',
      color: '#22c55e',
    },
    {
      title: 'Conectar panoramas',
      icon: GitDiff,
      link: 'panorama/connections',
      color: '#22c55e',
    },
    {
      title: 'Criar novo equipamento',
      icon: Gear,
      link: 'equipment/create',
      color: '#3b82f6',
    },
    {
      title: 'Listar equipamentos',
      icon: Gear,
      link: 'equipment/list',
      color: '#3b82f6',
    },
    {
      title: 'Cadastrar notas',
      icon: Note,
      link: 'notes/submit',
      color: '#eab308',
    },
    {
      title: 'Listar notas',
      icon: Note,
      link: 'notes/list',
      color: '#eab308',
    },
    {
      title: 'Marcar nota no panorama',
      icon: Note,
      link: 'notes/mark',
      color: '#eab308',
    },
  ]

  return (
    <div className="flex">
      <div className="mx-20">
        <Title>Página admnistrativa</Title>
        <h2 className="text-lg font-semibold">Acesso rápido</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map(({ icon, link, title, color }) => (
            <QuickAccessLink
              key={title}
              icon={icon}
              link={link}
              title={title}
              color={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
