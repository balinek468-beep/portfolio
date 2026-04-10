"use client";

import { useEffect } from "react";

const RELOAD_KEY = "portfolio-chunk-recovery";

function shouldRecoverFromMessage(message: string) {
  const normalized = message.toLowerCase();

  return (
    normalized.includes("/_next/static/chunks") ||
    normalized.includes("failed to fetch dynamically imported module") ||
    normalized.includes("loading chunk") ||
    normalized.includes("chunkloaderror")
  );
}

export default function ChunkRecovery() {
  useEffect(() => {
    const recover = (message: string) => {
      if (!shouldRecoverFromMessage(message)) {
        return;
      }

      if (window.sessionStorage.getItem(RELOAD_KEY) === "done") {
        return;
      }

      window.sessionStorage.setItem(RELOAD_KEY, "done");
      window.location.reload();
    };

    const handleError = (event: ErrorEvent) => {
      recover(event.message || "");
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason =
        typeof event.reason === "string"
          ? event.reason
          : JSON.stringify(event.reason || {});

      recover(reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
