import React, { createContext, useContext, useState } from 'react'

type PanoramaViewerContextProps = {
  changeEquipmentId: (id: string | null) => void
  selectedEquipmentId: string | null
}

const PanoramaViewerContext = createContext<PanoramaViewerContextProps>(
  {} as PanoramaViewerContextProps,
)

const PanoramaViewerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null,
  )

  function changeEquipmentId(equipmentId: string | null) {
    setSelectedEquipmentId(equipmentId)
  }

  console.log('executei')

  return (
    <PanoramaViewerContext.Provider
      value={{
        selectedEquipmentId,
        changeEquipmentId,
      }}
    >
      {children}
    </PanoramaViewerContext.Provider>
  )
}

const usePanoramaViewer = () => {
  const context = useContext(PanoramaViewerContext)

  return context
}

export { PanoramaViewerProvider, PanoramaViewerContext, usePanoramaViewer }
