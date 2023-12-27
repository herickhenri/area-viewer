import { PencilSimple, X } from "@phosphor-icons/react"
import { Marking } from "../pages/AddPanorama"

interface MarkingInputProps {
  mark: Marking
  deleteMark: (mark: Marking) => void
}

export function MarkingInput({ mark, deleteMark }: MarkingInputProps) {
  return (
    <div className="py-3 px-4 flex justify-between items-center border border-solid border-black/25 rounded">
      {mark.tag_equip ? (
        <span>{mark.tag_equip}</span>
      ) : (
        <input 
          className="outline-none"
          type="text"
          placeholder="Encontre o equipamento"
        />
      )}
      <div className="flex items-center gap-2">
        <PencilSimple size={24}/>
        <X size={24} onClick={() => deleteMark(mark)}/>
      </div>
  </div>
  )
}