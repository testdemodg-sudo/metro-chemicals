import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { useState } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends Element>(
  options: ScrollAnimationOptions = {},
): RefObject<T | null> {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    once = true,
  } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("in-view");
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

export function useScrollAnimationAll(
  selector: string,
  options: ScrollAnimationOptions = {},
): void {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    once = true,
  } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("in-view");
          }
        }
      },
      { threshold, rootMargin },
    );

    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, once]);
}

export function useNavbarScroll(scrollThreshold = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return isScrolled;
}
