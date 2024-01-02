import { Header } from '../components/Header';
import { SwiperEquipamento } from '../components/SwiperEquipamento';
import { equipamentos } from '../data/DataEquip';


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
      <Header />

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