import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface ImageSliderProps {
  urls: string[];
}
const ImageSlider = ({ urls }: ImageSliderProps) => {
  const activeStyle =
    "active:scale-[0.97] gird opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-sequare h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inActiveStyle = "hidden text-gray-400";
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button></button>
        <button></button>
        <Swiper className="h-full w-full ">
          {urls.map((url, i) => (
            <SwiperSlide key={i} className="-z-10 relative h-full w-full">
              <Image
                fill
                loading="eager"
                className="-z-10 h-full w-full object-cover object-center"
                src={url}
                alt="product image"
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default ImageSlider;
