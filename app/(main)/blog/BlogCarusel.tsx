"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { EmblaPluginType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  plugins?: EmblaPluginType[];
};

export const getWidth = () => {
  const width = document.documentElement.clientWidth;
  if (width > 1600) {
    return "basis-1/5";
  } else if (width <= 1600 && width > 1300) {
    return "basis-1/4";
  } else if (width <= 1300 && width > 1000) {
    return "basis-1/3";
  } else if (width <= 1000 && width > 700) {
    return "basis-1/2";
  } else {
    return "";
  }
};

function BlogCarusel() {
  const plugin = useRef(Autoplay({ delay: 2000 }));
  const [windowWidth, setWindowWidth] = useState("");
  useEffect(() => {
    setWindowWidth(getWidth());
    const handleResize = () => {
      setWindowWidth(getWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Carousel
        style={{ opacity: `${windowWidth === "" ? 0 : 1}` }}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play as unknown as MouseEventHandler<HTMLDivElement>}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className={windowWidth}>
              <div className="blog-carusel-item">
                <Image
                  alt="test"
                  src="/blog/blog-img1.png"
                  width={450}
                  height={200}
                  className="w-full"
                />
                <div className="px-6 py-3">
                  <div className="bci-author flex items-center">
                    <Image
                      alt="test"
                      src="/blog/blog-img1.png"
                      width={50}
                      height={50}
                      className=""
                    />
                    <div className="ml-2">
                      <h4>sid qolimorad</h4>
                      <span>May 1st, 2024</span>
                    </div>
                  </div>
                  <div className="bci-content my-4">
                    <h3>Seaside Serenity Villa</h3>
                    <p>
                      Wake up to the soothing melody of waves. This beachfront
                      villa offers...
                    </p>
                  </div>
                  <Link href="">
                    <div className="bci-btn">View Post Details</div>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default BlogCarusel;
