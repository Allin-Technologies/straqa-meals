import { getCMSURL } from "@/utilities/getURL";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const filename = (await params).filename;

  try {
    const response = await fetch(`${getCMSURL()}/api/media/file/${filename}`);
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch the image" },
      { status: 500 }
    );
  }
}
