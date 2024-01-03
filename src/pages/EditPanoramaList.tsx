import { PencilSimple } from "@phosphor-icons/react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { panoramas } from "../data/DataPanorama";
import { Link } from "react-router-dom";

export function EditPanoramaList() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdmin />
      
      <h1 className='text-center my-5 text-2xl font-semibold'>
        Panoramas
      </h1>

      <div className="md:px-56 flex flex-col gap-6 mb-10">
        {panoramas.map(panorama => (
          <div key={panorama.id}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg">{panorama.name}</h2>
              <Link to={panorama.id}>
                <PencilSimple size={28} className="cursor-pointer"/>
              </Link>
            </div>
            <img 
              className="h-80 object-cover rounded-lg"
              src={panorama.image} 
              alt="" 
            />
          </div>
        ))}
      </div>
    </div>
  )
}