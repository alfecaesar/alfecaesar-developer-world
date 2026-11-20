import { useCallback, useSyncExternalStore } from "react";

let webglSupport: boolean | undefined;

function detectWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

/** `null` during SSR and hydration, then whether WebGL is available. */
export function useWebGLSupport(): boolean | null {
  return useSyncExternalStore(noopSubscribe, detectWebGL, () => null);
}

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

/** Whether the browser tab is visible; used to pause rendering. */
export function usePageVisible(): boolean {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}

/** SSR-safe media query hook (server snapshot is `fallback`). */
export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}
