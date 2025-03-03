// import Image from "next/image";
// import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getDepricatedMenuBySlug } from "@/actions/get-by-slug";
import { getServerSideURL } from "@/utilities/getURL";
import { PageClientDepricated } from "./page.client";
// import { Sofadi_One } from "next/font/google";
// import { cn } from "@/utilities/ui";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const sofadiOne = Sofadi_One({
//   variable: "--font-sofadi-one",
//   weight: "400",
//   subsets: ["latin"],
// });
// const sofadiOne = Sofadi_One({
//   variable: "--font-sofadi-one",
//   weight: "400",
//   subsets: ["latin"],
// });

// const fallbackbg = `${getServerSideURL()}/set-of-restaurant-doodles-vector.jpg`;
// const fallbackbg = `${getServerSideURL()}/set-of-restaurant-doodles-vector.jpg`;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
  const slug = (await params).slug;

  const data = await getDepricatedMenuBySlug(slug);

  if (!data) notFound();

  return (
    <div className='container w-full p-4 lg:p-8 py-12 lg:py-20 flex flex-col justify-end lg:justify-center items-center min-h-dvh'>
      <PageClientDepricated {...data} />
    </div>
  );

  // return (
  //   <div
  //     style={
  //       {
  //         // background: `url(${data?.content?.background && typeof data?.content?.background !== "string" ? data?.content?.background?.url : fallbackbg})`,
  //         // background: `url(${fallbackbg})`,
  //       }
  //     }
  //     className='container w-full p-4 lg:p-8 flex flex-col justify-center items-center min-h-dvh'
  //   >
  //     <div className='pt-24 flex justify-center items-center min-h-[30vh] w-full'>
  //       <h1 className={cn("text-8xl", sofadiOne.className)}>{data?.title}</h1>
  //     </div>

  //     <div
  //       className='w-full py-4 lg:py-8 space-y-8 rounded-[54px] flex-1 bg-white/20 backdrop-blur-md'
  //       style={
  //         {
  //           // background: `url(${data?.content?.background && typeof data?.content?.background !== "string" ? data?.content?.background?.url : fallbackbg})`,
  //           // background: `url(${fallbackbg})`,
  //         }
  //       }
  //     >
  //       {data?.logo && typeof data?.logo !== "string" && data?.logo?.url && (
  //         <div className='px-4 lg:px-8'>
  //           <Image
  //             src={data?.logo?.url}
  //             alt={data?.logo?.alt ?? ""}
  //             width={100}
  //             height={100}
  //             className='object-contain w-14'
  //           />
  //         </div>
  //       )}

  //       <Accordion type='single'>
  //         {data?.content?.items?.map((item, index) => (
  //           <AccordionItem
  //             key={item.id || index}
  //             value={item.id || index?.toString()}
  //             className={cn({
  //               "border-b-transparent":
  //                 data?.content?.items?.length == index + 1,
  //             })}
  //           >
  //             <AccordionTrigger
  //               // style={{
  //               //   border: `0 0 4px ${item.color}`,
  //               //   // filter: `drop-shadow(3px 0 0 ${item.color}) drop-shadow(0 3px 0 ${item.color}) drop-shadow(-3px 0 0 ${item.color}) drop-shadow(0 -3px 0 ${item.color})`,
  //               // }}
  //               className={cn(
  //                 "font-bold text-3xl px-4 lg:px-8 py-6",
  //                 sofadiOne.className
  //               )}
  //             >
  //               {item?.label}
  //             </AccordionTrigger>
  //             <AccordionContent
  //               // style={{
  //               //   background: item.color,
  //               // }}
  //               className='px-4 lg:px-8 pb-6 space-y-3'
  //             >
  //               {item?.items?.map((item) => (
  //                 <div key={item.id || index} className={sofadiOne.className}>
  //                   <div className='flex justify-between gap-3 text-xl'>
  //                     <p>{item?.title}</p>
  //                     <div className='flex-1 border-white border-b border-dotted mb-3' />
  //                     <p>
  //                       {item?.price.currency}{" "}
  //                       {item?.price.amount?.toLocaleString()}
  //                     </p>
  //                   </div>
  //                   {item?.subtitle && (
  //                     <div>
  //                       <p>{item?.subtitle}</p>
  //                     </div>
  //                   )}
  //                 </div>
  //               ))}
  //             </AccordionContent>
  //           </AccordionItem>
  //         ))}
  //       </Accordion>
  //     </div>
  //   </div>
  // );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getDepricatedMenuBySlug(slug);

  if (!data) {
    return {};
  }

  const previousImages = (await parent).openGraph?.images || [];

  if (data?.meta?.image && typeof data?.meta?.image !== "string")
    return {
      title: data?.meta?.title ?? "",
      description: data?.meta?.description,
      openGraph: {
        images: [
          `${getServerSideURL()}/${data?.meta?.image?.url}`,
          ...previousImages,
        ],
      },
    };

  return {
    title: data?.meta?.title ?? "",
    description: data?.meta?.description,
    openGraph: {
      images: [...previousImages],
    },
  };
}
