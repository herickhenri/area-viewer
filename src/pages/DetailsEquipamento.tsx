import { Link } from 'react-router-dom';
import { SwiperEquipamento } from '../components/SwiperEquipamento';
import { equipamentos } from '../data/DataEquip';

import logoSuzano from '../assets/logo_suzano.png'

export function DetailsEquipamento() {
  const currentURL = new URL(window.location.href);
  const path = currentURL.pathname
  const pathArray = path.split('/')

  const slug = pathArray[pathArray.length-1]

  const equip = equipamentos.find((equip) => equip.tag.id == slug)

  if(!equip) {
    return <h1>Equipamento não encontrado</h1>
  }

  return (
    <div>
      <header className='py-4 px-4 shadow-lg flex w-full justify-between items-center gap-8'>
        <Link to="/">
          <img src={logoSuzano} alt="Logo da suzano" className='h-8'/>
        </Link>
    </header>

      <div className='px-8 my-6 md:px-28 md:mt-11 flex flex-col md:flex-row gap-4 md:gap-20'>
        <SwiperEquipamento image={equip.image}/>

        <div className='h-full flex-1 flex flex-col gap-4'>
          <h1 className='text-3xl font-semibold'>
            {equip.name}
          </h1>
        </div>
      </div>

    </div>
  )
}