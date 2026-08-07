declare global {
  interface Window {
    __preloaderDone?: boolean;
    __routeTransitionActive?: boolean;
  }
}

export function onPreloaderDone(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  if (window.__preloaderDone) {
    callback();
    return () => undefined;
  }

  let active = true;
  const onDone = () => {
    if (!active) return;
    active = false;
    callback();
  };

  window.addEventListener("preloader:done", onDone, { once: true });

  return () => {
    active = false;
    window.removeEventListener("preloader:done", onDone);
  };
}

export function onMotionReady(callback: () => void): () => void {
  let removeRouteListener = () => undefined;

  const removePreloaderListener = onPreloaderDone(() => {
    if (!window.__routeTransitionActive) {
      callback();
      return;
    }

    let active = true;
    const onRouteDone = () => {
      if (!active) return;
      active = false;
      callback();
    };

    window.addEventListener("route-transition:done", onRouteDone, {
      once: true,
    });
    removeRouteListener = () => {
      active = false;
      window.removeEventListener("route-transition:done", onRouteDone);
    };
  });

  return () => {
    removePreloaderListener();
    removeRouteListener();
  };
}
