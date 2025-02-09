"use server";

import data from "@/data.json";

export async function getBySlug(slug: string) {
  return data.find((data) => data?.slug === slug);
}
