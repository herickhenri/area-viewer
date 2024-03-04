export function loadImageAsBlob(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.crossOrigin = 'anonymous' // Necessário se a imagem estiver em um domínio diferente
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = img.width
      canvas.height = img.height

      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        resolve(blob)
      })
    }

    img.onerror = () => {
      reject(new Error('Erro ao carregar a imagem'))
    }

    img.src = url
  })
}

// Exemplo de uso
const imageUrl = 'https://exemplo.com/sua-imagem.jpg'
loadImageAsBlob(imageUrl)
  .then((blob) => {
    console.log('Blob carregado:', blob)
    // Faça algo com o blob aqui, como enviar para o servidor ou exibir na página
  })
  .catch((error) => {
    console.error('Erro:', error)
  })
