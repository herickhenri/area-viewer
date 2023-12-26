import logoSuzano from '../assets/logo_suzano.png'
import { Lightning, MapPin, PresentationChart, Tag } from '@phosphor-icons/react'

import { SwiperEquipamento } from '../components/SwiperEquipamento';
import { equipamentos } from '../data/DataEquip';


export function DetalhesEquipamento() {
  const currentURL = new URL(window.location.href);
  const path = currentURL.pathname
  const pathArray = path.split('/')

  const slug = pathArray[pathArray.length-1]

  const equip = equipamentos.find((equip) => equip.tag == slug)

  if(!equip) {
    return <h1>Equipamento não encontrado</h1>
  }

  return (
    <div>
      <header className='py-4 px-4 shadow-lg flex w-full flex-col md:flex-row items-center gap-8'>
        <a href="/">
          <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
        </a>

      </header>

      <div className='px-8 my-6 md:px-28 md:mt-11 flex flex-col md:flex-row gap-4 md:gap-20'>
        <SwiperEquipamento image={equip.image}/>

        <div className='h-full flex-1 text-gray-300 flex flex-col gap-4'>
          <h1 className='text-3xl font-semibold'>
            {equip.title}
          </h1>
          <span className='flex items-center gap-1 font-semibold'>
            <span className='flex items-center gap-1'>
              <Tag size={16} weight='bold'/> TAG:
            </span>
            {equip.tag}
          </span>

          <span className='flex flex-wrap items-center font-semibold gap-1'>
            <span className='flex items-center gap-1'>
              <MapPin size={16} weight="bold" /> Localização: 
            </span>
              {equip.loc}
          </span>

          {equip.fontes_energ && 
            <span className='flex flex-wrap items-center gap-1 font-semibold'>
              <span className='flex items-center gap-1'>
                <Lightning size={16} weight="bold" /> Fontes de energia:
              </span>
              {equip.fontes_energ.map((font_energ) => (
                <span 
                  className='text-teal-600 px-1 border-solid border-teal-600 border-2 rounded cursor-pointer hover:text-teal-500 hover:border-teal-500'
                >
                  {font_energ}
                </span>
              ))}
            </span>
          }

          <div>
            <span className='mb-2 flex items-center gap-1 font-semibold'>
              <PresentationChart size={16} weight="bold" />
              Parâmetros:
            </span>
            <div className='grid grid-cols-2 gap-2'>
              <span>Vazão: {equip.param.vazao}m3/h</span>
              <span>Velocidade nominal: {equip.param.vel_nom}rpm</span>
              <span>Cabeçote: {equip.param.cabecote}mLC</span>
              <span>Potência: {equip.param.potencia}110kW</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}