import { VirtualTourNode } from '@photo-sphere-viewer/virtual-tour-plugin'

export async function getNode(nodeId: string) {
  const node: VirtualTourNode = {
    id: nodeId,
    panorama: 'link-panorama',
  }

  // busca um panorama de menor qualidade (seu retorno sera mais rapido)

  // retorna o paronama de menor qualidade

  // buscar um panorama com a qualidade maxima (seu retorno demora-rá mais)

  // Substitui o panorama de menor qualidade pelo de maior qualidade

  return node
}
