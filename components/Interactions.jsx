"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import initializeMain from "../lib/client/main";
import initializeHome from "../lib/client/home";
import initializeProducts from "../lib/client/products";
import initializeCareers from "../lib/client/careers";
import initializeCenters from "../lib/client/tinting-center";
import initializeColors from "../lib/client/our-colors";
import initializeVisualizer from "../lib/client/color-visualizer";
import initializeInquiry from "../lib/client/inquiry";

const initializers = {
  home: initializeHome,
  products: initializeProducts,
  careers: initializeCareers,
  "tinting-center": initializeCenters,
  "our-colors": initializeColors,
  "color-visualizer": initializeVisualizer,
  inquiry: initializeInquiry,
};

// Keep the existing interactions while tying their lifecycle to React navigation.
// Abort listeners/requests and clear timers when a page unmounts or changes.
export default function Interactions({ behavior }) {
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    const timeouts = new Set();
    const intervals = new Set();
    const scope = {
      on(target, event, handler, options = {}) {
        target?.addEventListener(event, handler, {
          ...options,
          signal: controller.signal,
        });
      },
      setTimeout(handler, delay) {
        const id = window.setTimeout(handler, delay);
        timeouts.add(id);
        return id;
      },
      setInterval(handler, delay) {
        const id = window.setInterval(handler, delay);
        intervals.add(id);
        return id;
      },
      clearTimeout: window.clearTimeout.bind(window),
      clearInterval: window.clearInterval.bind(window),
      fetch(url, options = {}) {
        return fetch(url, { ...options, signal: controller.signal });
      },
      get disposed() {
        return controller.signal.aborted;
      },
    };
    initializeMain(scope);
    initializers[behavior]?.(scope);
    return () => {
      controller.abort();
      timeouts.forEach(window.clearTimeout);
      intervals.forEach(window.clearInterval);
      document.body.style.overflow = "";
    };
  }, [pathname, behavior]);
  return null;
}
