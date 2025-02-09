"use client";

import type { Data } from "./type";

import React, { useState, useRef } from "react";
import { HTMLFlipBook } from "@/components/flipbook";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface PageProps {
  number?: number;
  url: string;
}

const PageCover = React.forwardRef<HTMLDivElement, PageProps>(
  ({ url }, ref) => (
    <div className='page page-cover' ref={ref} data-density='hard'>
      <img src={url} alt='' className='w-full h-full' />
    </div>
  )
);
PageCover.displayName = "PageCover";

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ url }, ref) => (
  <div className='page' ref={ref}>
    <img src={url} alt='' className='w-full h-full' />
  </div>
));
Page.displayName = "Page";

export function PageClient(props: Data) {
  const flipBookRef = useRef<any | null>(null);
  const [api, setApi] = React.useState<CarouselApi>();
  const [page, setPage] = useState<number>(0);
  const [totalPage] = useState<number>(props?.pdf.length);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isMobile = useIsMobile();

  const nextButtonClick = () => flipBookRef.current?.flipNext();
  const prevButtonClick = () => flipBookRef.current?.flipPrev();
  const onPage = (e: { data: number }) => setPage(e.data);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isMobile) {
    return (
      <div className='container w-full p-4 lg:p-8 space-y-8 flex flex-col justify-center items-center'>
        <Carousel
          setApi={setApi}
          className='w-full max-w-[90%] mx-auto space-y-8'
        >
          <CarouselContent>
            {props?.pdf.map((url, index) => (
              <CarouselItem key={index}>
                <div className='p-1'>
                  <img
                    src={`/assets/${props.slug}/${url}`}
                    className='w-full h-full'
                    alt=''
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className='flex justify-center items-center gap-3'>
            <CarouselPrevious className='static translate-y-0' />

            <div>
              [<span>{current}</span> of <span>{count}</span>]
            </div>

            <CarouselNext className='static translate-y-0' />
          </div>
        </Carousel>
      </div>
    );
  }

  return (
    <div className='container w-full p-4 lg:p-8 space-y-8 flex flex-col justify-center items-center'>
      {/* @ts-ignore */}
      <HTMLFlipBook
        ref={flipBookRef}
        width={550}
        height={733}
        size='stretch'
        showCover={true}
        onFlip={onPage}
        usePortrait={false}
      >
        {/* Front Cover */}
        <PageCover url={`/assets/${props.slug}/${props?.pdf[0]}`} />

        {/* Content Pages */}
        {props?.pdf.slice(1, props?.pdf.length - 1).map((content, index) => (
          <Page
            key={index}
            number={index + 1}
            url={`/assets/${props.slug}/${props?.pdf[index + 1]}`}
          />
        ))}

        {/* Back Cover */}
        <PageCover
          url={`/assets/${props.slug}/${props?.pdf[props?.pdf.length - 1]}`}
        />
      </HTMLFlipBook>

      <div className='container'>
        <div className='flex justify-center items-center gap-3'>
          <Button onClick={prevButtonClick} disabled={page === 0}>
            <ChevronLeft />
          </Button>

          <div>
            [<span>{page + 1}</span> of <span>{totalPage}</span>]
          </div>

          <Button
            onClick={nextButtonClick}
            disabled={page === props?.pdf.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
