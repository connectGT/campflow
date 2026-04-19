"use client";

import { useEffect } from "react";

export function ChatwootWidget() {
  useEffect(() => {
    const websiteToken = process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN;
    const baseUrl = process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "https://app.chatwoot.com";

    if (!websiteToken) return;

    // Standard Chatwoot snippet
    (function(d, t) {
      const BASE_URL = baseUrl;
      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
      
      g.onload = function() {
        (window as any).chatwootSDK.run({
          websiteToken: websiteToken,
          baseUrl: BASE_URL
        });
      };
    })(document, "script");
  }, []);

  return null;
}
