import { getBySlug } from "@/actions/get-by-slug";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getServerSideURL } from "@/utilities/getURL";
import { PageClient } from "./page.client";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
  const slug = (await params).slug;

  const data = await getBySlug(slug);

  if (!data) notFound();

  return (
    <div className='pt-24 w-screen min-h-dvh flex justify-center items-center'>
      <PageClient {...data} />
    </div>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getBySlug(slug);
  const id = (await params).slug;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.title ?? "",
    openGraph: {
      images: [
        `${getServerSideURL()}/assets/${slug}/${data?.pdf?.[0]}`,
        ...previousImages,
      ],
    },
  };
}
