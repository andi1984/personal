"use client";

import {
  FiMusic,
  FiPause,
  FiPlay,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

import { useAudioPlayer } from "@/contexts/audio-player-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import AudioVisualizer from "@/components/audio-visualizer";

export default function BackgroundAudioPlayer() {
  const {
    isPlaying,
    volume,
    currentTrack,
    tracks,
    isLoading,
    togglePlay,
    setVolume,
  } = useAudioPlayer();

  // Don't render if no tracks available
  if (isLoading || tracks.length === 0) {
    return null;
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const VolumeIcon =
    volume === 0 ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2;

  // Format track name for display (remove extension, truncate)
  const displayTrackName = currentTrack
    ? currentTrack.replace(/\.mp3$/i, "").slice(0, 20) +
      (currentTrack.length > 24 ? "..." : "")
    : "Play";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Visualizer behind player - bars grow upward */}
      <AudioVisualizer className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1" />

      {/* Player controls */}
      <div
        className={cn(
          "relative",
          "flex items-center gap-3 rounded-full px-3 py-2",
          "border border-slate-200/50 bg-white/80 shadow-lg backdrop-blur-md",
          "dark:border-slate-700/50 dark:bg-slate-800/80",
          "transition-all duration-300 ease-out",
          "hover:shadow-xl",
        )}
      >
        {/* Play/Pause Button */}
        <Button
          size="icon"
          onClick={togglePlay}
          className="h-9 w-9 rounded-full bg-emerald-500 hover:bg-emerald-600"
          aria-label={
            isPlaying ? "Pause background music" : "Play background music"
          }
        >
          {isPlaying ? (
            <FiPause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <FiPlay className="h-4 w-4 translate-x-0.5" aria-hidden="true" />
          )}
        </Button>

        {/* Track Info */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <FiMusic
            className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
          <span className="text-slate-600 dark:text-slate-300 max-w-[120px] truncate">
            {displayTrackName}
          </span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <VolumeIcon
            className="h-4 w-4 text-slate-500 dark:text-slate-400"
            aria-hidden="true"
          />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-20"
            aria-label="Adjust background music volume"
          />
        </div>
      </div>
    </div>
  );
}
