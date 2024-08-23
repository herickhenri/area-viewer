import { Button } from '@/components/button'
import * as Dialog from '@radix-ui/react-dialog'

interface WarningNoteNotFoundProps {
  open: boolean
  changeOpen: (open: boolean) => void
}

export function WarningNoteNotFound({
  open,
  changeOpen,
}: WarningNoteNotFoundProps) {
  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40" />
        <Dialog.Content className="absolute left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 space-y-3 rounded bg-slate-100 p-5">
          <h2 className="text-center text-xl text-red-800">
            Nota não encontrada
          </h2>
          <p>
            Não foi possível encontrar está nota no nosso sistema. A mesma pode
            ter sido removida ou ainda nao foi adicionada.
          </p>
          <p>
            Verifique se a nota está correta, se estiver você pode adicionar a
            marcação agora e após os outros dados da nota serem adicionados a
            mesma irá aparecer nos panoramas.
          </p>

          <Dialog.Close asChild>
            <Button theme="delete" className="mx-auto">
              Voltar
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
