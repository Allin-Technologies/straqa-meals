"use server";

import { stringify } from "qs-esm";
import type { Where } from "payload";
import { DepricatedMenu, Menu } from "@/payload-interface";

export async function getDepricatedMenuBySlug(
  slug: string
): Promise<DepricatedMenu | null> {
  try {
    // Construct the query for filtering by slug
    const query = stringify(
      { where: { slug: { equals: slug } } },
      { addQueryPrefix: true }
    );

    // Fetch the item directly using the query
    const res = await fetch(
      `${process.env.CMS_SERVER_URL}/api/depricated_menus${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Prevents caching
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch: ${res.statusText}`);
      return null;
    }

    // Extract the response data
    const data: { docs: DepricatedMenu[] } = await res.json();

    // Return the first matching document, or null if none found
    return data.docs.length > 0 ? data.docs[0] : null;
  } catch (error) {
    console.error("Error fetching deprecated menu:", error);
    return null;
  }
}

export async function getDepricatedMenuBySearch(
  search: string
): Promise<DepricatedMenu[] | null> {
  try {
    const where: Where = {
      or: [
        {
          name: { like: search },
        },
        {
          slug: { like: search },
        },
      ],
    };

    const stringifiedQuery = stringify(
      {
        where, // ensure that `qs` adds the `select` property, too!
      },
      { addQueryPrefix: true }
    );

    const res = await fetch(
      `${process.env.CMS_SERVER_URL}/api/depricated_menus${stringifiedQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error(res.statusText);
      // throw new Error(`Failed to fetch: ${res.statusText}`);
      return null;
    }

    const data: { docs: DepricatedMenu[] } = await res.json();
    return data?.docs;
  } catch (error) {
    console.error("Error fetching deprecated menu:", error);
    return null;
  }
}

export async function getMenuBySlug(slug: string): Promise<Menu | null> {
  try {
    // Construct the query for filtering by slug
    const query = stringify(
      { where: { slug: { equals: slug } }, draft: false },
      { addQueryPrefix: true }
    );

    const res = await fetch(`${process.env.CMS_SERVER_URL}/api/menus${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(res.statusText);
      // throw new Error(`Failed to fetch: ${res.statusText}`);
      return null;
    }

    const data: { docs: Menu[] } = await res.json();
    return data?.docs.find((item) => item?.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching deprecated menu:", error);
    return null;
  }
}

export async function getMenuBySearch(search: string): Promise<Menu[] | null> {
  try {
    const where: Where = {
      or: [
        {
          name: { like: search },
        },
        {
          slug: { like: search },
        },
      ],
    };

    const stringifiedQuery = stringify(
      {
        where, // ensure that `qs` adds the `select` property, too!
      },
      { addQueryPrefix: true }
    );

    const res = await fetch(
      `${process.env.CMS_SERVER_URL}/api/menus${stringifiedQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error(res.statusText);
      // throw new Error(`Failed to fetch: ${res.statusText}`);
      return null;
    }

    const data: { docs: Menu[] } = await res.json();
    return data?.docs;
  } catch (error) {
    console.error("Error fetching deprecated menu:", error);
    return null;
  }
}
