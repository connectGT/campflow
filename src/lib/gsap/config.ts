"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins once at import time
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Default ScrollTrigger config
export const defaultScrollTrigger = {
  start: "top 80%",
  toggleActions: "play none none none" as const,
  markers: process.env.NODE_ENV === "development" ? false : false,
};

export { gsap, ScrollTrigger, ScrollToPlugin };
