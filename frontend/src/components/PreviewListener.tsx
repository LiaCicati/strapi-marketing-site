"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Listens for messages from the Strapi admin Preview panel.
 *
 * - "strapiUpdate": Triggered when content is saved in Strapi.
 *   Calls router.refresh() to re-fetch server components with latest data.
 *
 * - "strapiScript": Injects the Strapi highlighting script into the page,
 *   enabling visual indicators for Live Preview (Growth/Enterprise plans).
 *
 * Sends "previewReady" back to Strapi to signal the frontend is loaded.
 */
export function PreviewListener() {
  const router = useRouter();

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Strapi sends "strapiUpdate" when content is saved
      if (event.data?.type === "strapiUpdate") {
        router.refresh();
        return;
      }

      // Strapi sends "strapiScript" with a script to inject for Live Preview highlighting
      if (event.data?.type === "strapiScript" && event.data?.script) {
        const scriptEl = document.createElement("script");
        scriptEl.textContent = event.data.script;
        document.head.appendChild(scriptEl);
        return;
      }
    }

    window.addEventListener("message", handleMessage);

    // Tell Strapi the preview iframe is ready
    if (window.parent !== window) {
      window.parent.postMessage("previewReady", "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return null;
}
