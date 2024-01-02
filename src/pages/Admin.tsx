import { CubeTransparent, GearSix, Lock } from "@phosphor-icons/react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { ButtonAdm } from "../components/ButtonAdmin";

export function Admin() {
  return (
    <div>
      <HeaderAdmin />

      <h1 className="text-center font-semibold text-2xl md:text-4xl my-5">
          Página admnistrativa
      </h1>

      <div className="mb-10 px-6 md:mx-80 flex flex-col gap-5 items-center">
        <ButtonAdm 
          content="Cadastrar Equipamentos" 
          icon={GearSix}
          link={"add-equipamento"}
        />
        <ButtonAdm 
          content="Editar Equipamentos" 
          icon={GearSix}
          link={"edit-equip-list"}
        />

        <div className="w-full h-px bg-black my-5"/>

        <ButtonAdm 
          content="Cadastrar Panoramas" 
          icon={CubeTransparent}
          link={"add-panorama"}
        />
        <ButtonAdm 
          content="Editar Panoramas" 
          icon={CubeTransparent}
          link={"edit-panorama-list"}
        />

        <div className="w-full h-px bg-black my-5"/>

        <ButtonAdm 
          content="Cadastrar Bloqueios" 
          icon={Lock}
          link={"/admin"}
        />
        <ButtonAdm 
          content="Editar Bloqueios" 
          icon={Lock}
          link={"/admin"}
        />
      </div>
    </div>
  )
}