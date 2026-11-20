const EVENT_NAME = "portfolio:cursor-hover";

/** Lets 3D objects tell the custom cursor they are hoverable. */
export function setCursorHover(hovering: boolean) {
  window.dispatchEvent(new CustomEvent<boolean>(EVENT_NAME, { detail: hovering }));
}

export function onCursorHover(listener: (hovering: boolean) => void) {
  const handler = (event: Event) => {
    if (event instanceof CustomEvent && typeof event.detail === "boolean") {
      listener(event.detail);
    }
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
