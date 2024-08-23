import { getPanoramas } from '@/api/get-panoramas'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'

type Edge = {
  from: string
  to: string
}

export function ModuleGraph() {
  const { data: panoramas } = useQuery({
    queryKey: ['panoramas'],
    queryFn: getPanoramas,
  })

  const networdRef = useRef(null)

  useEffect(() => {
    if (!panoramas || !networdRef.current) return

    const edges = panoramas?.reduce((acc: Edge[], panorama) => {
      const connectionsFrom = panorama.connections_from

      const newEdge: Edge[] | undefined = connectionsFrom?.map(
        ({ connected_from_id, connected_to_id }) => ({
          from: connected_from_id,
          to: connected_to_id,
        }),
      )

      return acc.concat(newEdge || [])
    }, [])

    const nodesData = panoramas.map(({ id, name }) => ({ id, label: name }))

    if (!edges || !nodesData) return

    const nodes = new DataSet(nodesData)

    const data = { nodes, edges }
    const options = {}

    new Network(networdRef.current, data, options)
  }, [panoramas])

  return <div className="h-screen w-full" ref={networdRef}></div>
}
