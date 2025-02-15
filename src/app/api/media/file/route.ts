import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url: string = searchParams.get("url") as string;

  try {
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch the image" },
      { status: 500 }
    );
  }
}
