"use client";

import { useEffect, useRef, useState } from "react";

import { useAudioPlayer } from "@/contexts/audio-player-context";
import { cn } from "@/lib/utils";

type AudioVisualizerProps = {
  className?: string;
};

export default function AudioVisualizer({ className }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { analyser, isPlaying } = useAudioPlayer();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [largeViewport, setLargeViewport] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    setPrefersReducedMotion(mediaReducedMotion.matches);
    const handleReduceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    const largeViewport = window.matchMedia("(min-width: 639px)");
    setLargeViewport(largeViewport.matches);
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setLargeViewport(event.matches);
    };

    mediaReducedMotion.addEventListener("change", handleReduceChange);
    largeViewport.addEventListener("change", handleViewportChange);
    return () => {
      mediaReducedMotion.removeEventListener("change", handleReduceChange);
      largeViewport.removeEventListener("change", handleViewportChange);
    };
  }, []);

  // Draw visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !largeViewport ||
      !canvas ||
      !analyser ||
      !isPlaying ||
      prefersReducedMotion
    ) {
      // Clear any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Clear canvas when not playing
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bars from center outward
      const barCount = bufferLength;
      const barWidth = canvas.width / barCount;
      const centerY = canvas.height;

      for (let i = 0; i < barCount; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(
          0,
          centerY - barHeight,
          0,
          centerY,
        );
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.9)"); // emerald-500
        gradient.addColorStop(1, "rgba(16, 185, 129, 0.3)");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth,
          centerY - barHeight,
          barWidth - 1,
          barHeight,
        );
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [analyser, isPlaying, prefersReducedMotion, largeViewport]);

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={80}
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        "transition-opacity duration-300",
        isPlaying ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
