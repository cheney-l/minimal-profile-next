"use client";

import { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const currentBuildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION || "dev";

function buildVersionUrl() {
  return `${basePath}/version.json?t=${Date.now()}`;
}

function buildFreshUrl(version) {
  const url = new URL(window.location.href);

  url.searchParams.set("v", version);

  return url.toString();
}

export default function BuildVersionGuard() {
  useEffect(() => {
    let cancelled = false;

    async function checkVersion() {
      try {
        const response = await fetch(buildVersionUrl(), {
          cache: "no-store"
        });

        if (!response.ok || cancelled) {
          return;
        }

        const data = await response.json();
        const latestVersion = data?.version;

        if (!latestVersion || latestVersion === currentBuildVersion) {
          return;
        }

        const currentUrl = new URL(window.location.href);

        if (currentUrl.searchParams.get("v") === latestVersion) {
          return;
        }

        window.location.replace(buildFreshUrl(latestVersion));
      } catch {
        // Silently ignore version check failures; the page should still work.
      }
    }

    checkVersion();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
