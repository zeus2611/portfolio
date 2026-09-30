"use client";

import { useEffect, useRef } from "react";
import { heightField, project, STATIC_FRAME_T, waveGrid } from "@/lib/wave";

const MAX_DPR = 1.5;
const MAX_FPS = 30;
const FRAME_INTERVAL = 1000 / MAX_FPS;
const MOBILE_BREAKPOINT = 768;

/**
 * A wireframe terrain grid rendered as a Canvas 2D animation — see
 * DESIGN.md → "Signature 1: the wave hero" for the exact maths. No
 * dependencies, no three.js: this is a deliberately small module.
 */
export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let xs: number[] = [];
    let ds: number[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      ({ xs, ds } = waveGrid(mobile));
    }

    // One Path2D per frame, one stroke() call — 68 separate stroke() calls
    // per frame was the dominant cost under simulated mobile CPU throttling.
    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);

      const rootStyle = getComputedStyle(document.documentElement);
      const accent = rootStyle.getPropertyValue("--accent").trim() || "#1f6f6a";
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      const path = new Path2D();

      // Depth lines: fixed depth, traced along x (23 on desktop).
      for (const d of ds) {
        xs.forEach((x, i) => {
          const [sx, sy] = project(x, d, heightField(x, d, t), width, height);
          if (i === 0) path.moveTo(sx, sy);
          else path.lineTo(sx, sy);
        });
      }

      // Cross lines: fixed x, traced along depth (45 on desktop).
      for (const x of xs) {
        ds.forEach((d, i) => {
          const [sx, sy] = project(x, d, heightField(x, d, t), width, height);
          if (i === 0) path.moveTo(sx, sy);
          else path.lineTo(sx, sy);
        });
      }

      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 1;
      ctx!.globalAlpha = isDark ? 0.5 : 0.42;
      ctx!.stroke(path);
    }

    resize();
    draw(STATIC_FRAME_T);

    if (reducedMotion) {
      const onResize = () => draw(STATIC_FRAME_T);
      const themeObserver = new MutationObserver(() => draw(STATIC_FRAME_T));
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        themeObserver.disconnect();
      };
    }

    let elapsed = STATIC_FRAME_T;
    let lastFrameTime = 0;
    let rafId = 0;
    let running = false;

    function loop(now: number) {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrameTime < FRAME_INTERVAL) return;
      const dt = lastFrameTime ? (now - lastFrameTime) / 1000 : 0;
      lastFrameTime = now;
      elapsed += Math.min(dt, 1 / 30);
      draw(elapsed);
    }

    function start() {
      if (running) return;
      running = true;
      lastFrameTime = 0;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    let idleHandle: number | ReturnType<typeof setTimeout> | undefined;
    let idleIsCallback = false;
    let idleRequested = false;

    function beginWhenIdle() {
      if (idleRequested) return;
      idleRequested = true;
      if (typeof window.requestIdleCallback === "function") {
        idleIsCallback = true;
        idleHandle = window.requestIdleCallback(() => start());
      } else {
        idleHandle = setTimeout(start, 200);
      }
    }

    const onResize = () => {
      resize();
      draw(elapsed);
    };
    window.addEventListener("resize", onResize);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) beginWhenIdle();
          else stop();
        }
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(canvas);

    function onVisibilityChange() {
      if (document.hidden) stop();
      else beginWhenIdle();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      intersectionObserver.disconnect();
      stop();
      if (idleHandle !== undefined) {
        if (idleIsCallback && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleHandle as number);
        } else {
          clearTimeout(idleHandle as ReturnType<typeof setTimeout>);
        }
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="wave-canvas absolute inset-0 h-full w-full"
    />
  );
}
