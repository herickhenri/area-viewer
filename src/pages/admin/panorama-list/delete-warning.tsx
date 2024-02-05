import { Button } from '@/components/button'
import * as Dialog from '@radix-ui/react-dialog'

interface deleteWarningProps {
  deletePanorama: () => Promise<void>
}

export function DeleteWarning({ deletePanorama }: deleteWarningProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button theme="delete">Excluir</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 flex max-w-96 -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg bg-white px-4 py-6">
          <span className="text-center text-xl font-semibold">
            Tem certeza de que deseja excluir{' '}
            <strong className="text-red-500">Permanentemente</strong> o
            panorama?
          </span>
          <div className="flex gap-4 font-semibold">
            <Dialog.Close asChild>
              <Button className="flex-1">Cancelar</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                className="flex-1"
                theme="delete"
                onClick={deletePanorama}
              >
                Excluir
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
