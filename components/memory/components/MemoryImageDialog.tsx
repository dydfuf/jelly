import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  imageSrc: string;
  imageSrcList: string[];
}

export default function MemoryImageDialog({
  open,
  setOpen,
  imageSrc,
  imageSrcList,
}: Props) {
  const findDefaultImageIdx = imageSrcList.findIndex(
    (image) => image === imageSrc
  );
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setCurrentIdx(findDefaultImageIdx + 1);
  }, [findDefaultImageIdx, open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Overlay className="fixed z-[9999] inset-0 data-[state=open]:bg-black/[0.7]" />
      <Dialog.Content className="fixed z-[9999] left-1/2 top-1/2 w-full h-[-webkit-fill-available] -translate-x-1/2 -translate-y-1/2 bg-transparent focus:outline-none px-20">
        <Swiper
          className="w-full h-full"
          initialSlide={findDefaultImageIdx}
          pagination={{ type: "fraction" }}
          onSlideChange={({ snapIndex }) => setCurrentIdx(snapIndex + 1)}
        >
          {imageSrcList.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={image}
                fill
                alt="image-dialog"
                className="object-contain"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center mt-20">
          <p className="bg-white px-20 rounded-full">{`${currentIdx} / ${imageSrcList.length}`}</p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
