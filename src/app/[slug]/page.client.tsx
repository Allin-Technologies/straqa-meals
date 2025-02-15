"use client";

import type { DepricatedMenu } from "@/payload-interface";

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

export function PageClientDepricated(props: DepricatedMenu) {
  const flipBookRef = useRef<any | null>(null);
  const [api, setApi] = React.useState<CarouselApi>();

  const pages =
    props?.content?.items?.filter((item) => typeof item !== "string") || [];

  const [page, setPage] = useState<number>(0);
  const [totalPage] = useState<number>(pages.length);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const isMobile = useIsMobile();

  const nextButtonClick = () => flipBookRef.current?.flipNext();
  const prevButtonClick = () => flipBookRef.current?.flipPrev();
  const onPage = (e: { data: number }) => setPage(e.data);

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
        usePortrait={isMobile}
      >
        {/* Front Cover */}
        <PageCover url={`${pages?.[0]?.url}`} />

        {/* Content Pages */}
        {pages.slice(1, pages.length - 1).map((content, index) => (
          <Page
            key={index}
            number={index + 1}
            url={`${pages?.[index + 1]?.url}`}
          />
        ))}

        {/* Back Cover */}
        <PageCover url={`${pages?.[pages.length - 1]?.url}`} />
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
            disabled={page === pages.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
