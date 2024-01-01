import { PlusCircle, X } from "@phosphor-icons/react";
import { Header } from "../components/header";
import { UploadImage } from "../components/UploadImage";
import { useState } from "react";

export function AddEquipamento() {
  const [photos, setPhotos] = useState<string[]>([])

  function updateImgSrc(source: string) {
    setPhotos(prevPhotos => [...prevPhotos, source])
  }

  function deletePhoto(source: string) {
    setPhotos(prevPhotos => {
      const updatePhoto = prevPhotos.filter(photo => photo !== source)

      return updatePhoto
    })
  }

  return (
    <div>
      <Header />

      <h1 className="mx-6 text-center font-semibold text-2xl md:text-4xl my-5">
          Adicionar novo equipamento
      </h1>

      <form className="px-6 mb-10 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span>
            Nome:
          </span>
          <input 
            type="text" 
            className="py-2 px-4 w-full border border-solid border-black/25 rounded focus:outline-blue-500"
            placeholder="Nome"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span>Tag:</span>
          <div className="flex w-full items-center justify-between">
            <input 
              className="text-black/25 py-2 w-10 text-center border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text"
              disabled
              value={"I"}
            />
            <span>-</span>
            <input 
              className="py-2 w-20 text-center border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              maxLength={4} 
              minLength={4}
            />
            <span>-</span>
            <input 
              className="py-2 w-14 text-center border border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              maxLength={2} 
              minLength={2}
            />
            <span>-</span>
            <input 
              className="py-2 w-16 border text-center border-solid border-black/25 rounded focus:outline-blue-500"
              type="text" 
              maxLength={3} 
              minLength={3}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span>Fotos:</span>
          <UploadImage
            className="text-black/50 w-full h-20 flex items-center justify-center gap-2 border-2 border-dashed border-black/25 rounded hover:border-blue-500 transition-colors cursor-pointer"
            updateImgSrc={updateImgSrc}
          >
            <PlusCircle size={32} weight="light"/>
            <span>Adicione as fotos aqui</span>
          </UploadImage>
          {photos.map(photo => (
            <div key={photo} className="flex gap-2 items-center">
              <img src={photo} alt="" className="w-10 aspect-square object-cover rounded"/>
              <span className="flex-1">Nome da foto</span>
              <X 
                className="mr-2 cursor-pointer"
                onClick={() => deletePhoto(photo)}
              />
            </div>
          ))}
        </div>

        <a
          className="py-2 px-6 mx-auto max-w-max text-white text-lg font-medium rounded bg-blue-800 hover:bg-blue-900 transition-colors" 
          href=""
        >
          Cadastrar equipamento
        </a>
      </form>
    </div>
  )
}