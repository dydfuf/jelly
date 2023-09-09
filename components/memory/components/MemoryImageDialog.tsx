import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  imageSrc: string;
}

export default function MemoryImageDialog({ open, setOpen, imageSrc }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Overlay className="fixed z-[9999] inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed z-[9999] left-1/2 top-1/2 max-w-[80dvw] w-[80dvw] max-h-[80dvh] h-[80vh] -translate-x-1/2 -translate-y-1/2 bg-transparent focus:outline-none">
        <Dialog.Close asChild>
          <Image
            src={imageSrc}
            fill
            alt="image-dialog"
            className="object-contain rounded-8"
          />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
