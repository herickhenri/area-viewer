export async function getImage(link: string) {
  const response = await fetch(link)
  const blob = await response.blob()

  const nodeUrl = URL.createObjectURL(blob)

  return nodeUrl
}
