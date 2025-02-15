export interface Media {
  id: string;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

export interface DepricatedMenu {
  id: string;
  title: string;
  logo: string | Media;
  content?: {
    background?: (string | null) | Media;
    slug?: string | null;
    slugLock?: boolean | null;
    items?: (string | Media)[] | null;
  };
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
    description?: string | null;
  };
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

export interface Menu {
  id: string;
  title: string;
  logo: string | Media;
  content?: {
    background?: (string | null) | Media;
    items?:
      | {
          label: string;
          color: string;
          image: string | Media;
          items?:
            | {
                title: string;
                subtitle: string;
                price: {
                  amount: number;
                  currency: "NGN" | "USD" | "GBP";
                };
                id?: string | null;
              }[]
            | null;
          id?: string | null;
        }[]
      | null;
  };
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
    description?: string | null;
  };
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ("draft" | "published") | null;
}
