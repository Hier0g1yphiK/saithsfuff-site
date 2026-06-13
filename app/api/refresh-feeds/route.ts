import { NextResponse } from "next/server";
import { refreshInstagramFeed, refreshTikTokFeed } from "@/lib/feeds";

export const dynamic = "force-dynamic";

interface RefreshResponse {
  success: boolean;
  instagramCount: number;
  tiktokCount: number;
  errors: string[];
}

export async function POST(request: Request): Promise<NextResponse<RefreshResponse | { error: string }>> {
  // Validate API key
  const apiKey = process.env.REFRESH_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.slice("Bearer ".length);
  if (token !== apiKey) {
    return NextResponse.json(
      { error: "Invalid API key" },
      { status: 401 }
    );
  }

  // Run both feed refreshes in parallel
  try {
    const results = await Promise.allSettled([
      refreshInstagramFeed(),
      refreshTikTokFeed(),
    ]);

    const errors: string[] = [];
    let instagramCount = 0;
    let tiktokCount = 0;

    if (results[0].status === "fulfilled") {
      instagramCount = results[0].value;
    } else {
      errors.push("Instagram feed refresh failed");
    }

    if (results[1].status === "fulfilled") {
      tiktokCount = results[1].value;
    } else {
      errors.push("TikTok feed refresh failed");
    }

    const response: RefreshResponse = {
      success: errors.length === 0,
      instagramCount,
      tiktokCount,
      errors,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Feed refresh failed:", error);
    return NextResponse.json(
      {
        success: false,
        instagramCount: 0,
        tiktokCount: 0,
        errors: ["Internal server error during feed refresh"],
      } as RefreshResponse,
      { status: 500 }
    );
  }
}
