import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/**
 * Preview API route for Strapi 5 Preview feature.
 *
 * Strapi's preview handler builds a URL like:
 *   /api/preview?url=/blog/my-post&secret=xxx&status=draft
 *
 * This route validates the secret, enables/disables Next.js Draft Mode
 * based on the status parameter, and redirects to the content URL.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const url = searchParams.get("url");
  const status = searchParams.get("status");

  // Validate the preview secret
  if (secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  const draft = await draftMode();

  // Enable draft mode for draft content, disable for published
  if (status === "published") {
    draft.disable();
  } else {
    draft.enable();
  }

  // Redirect to the actual content page
  redirect(url);
}
