"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FiLoader, FiPause, FiPlay, FiRotateCcw, FiVolume2, FiVolumeX } from "react-icons/fi";

import { cn } from "@/lib/utils";

type IntroAudioPlayerProps = {
  className?: string;
};

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const IntroAudioPlayer = ({ className }: IntroAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => {
      const metadataDuration = audio.duration;
      setDuration(Number.isFinite(metadataDuration) ? metadataDuration : 0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleVolumeChange = () => {
      setVolume(audio.volume);
      setIsMuted(audio.muted || audio.volume === 0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("volumechange", handleVolumeChange);

    handleVolumeChange();

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      setIsLoading(true);
      await audio.play();
    } catch (error) {
      console.error("Unable to play the introduction audio.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    if (!audio.muted && audio.volume === 0) {
      audio.volume = 0.5;
    }
  };

  const restartAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setProgress(0);
  };

  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setProgress(nextTime);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextVolume = Number(event.target.value);
    audio.volume = nextVolume;
    audio.muted = nextVolume === 0;
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-white/30 bg-white/15 p-6 text-left shadow-lg backdrop-blur-sm transition",
        "dark:border-emerald-100/10 dark:bg-emerald-900/40",
        className,
      )}
    >
      <div>
        <p className="text-sm uppercase tracking-widest text-emerald-100">Audio introduction</p>
        <p className="text-lg font-semibold text-white">Meet Andi in your own time</p>
        <p className="text-sm text-emerald-100/80">
          Press play to hear the story behind this site. Control playback, sound and position whenever you like.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs font-medium text-white/80">
          <span className="tabular-nums">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={handleProgressChange}
            aria-label="Seek through introduction audio"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 [--tw-ring-color:theme(colors.white)] accent-white/90"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.95) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
            }}
          />
          <span className="tabular-nums">{duration ? formatTime(duration) : "0:00"}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1 text-white/90 shadow-sm">
          <button
            type="button"
            onClick={togglePlayback}
            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={isPlaying ? "Pause introduction audio" : "Play introduction audio"}
            disabled={isLoading}
          >
            {isLoading ? (
              <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : isPlaying ? (
              <FiPause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <FiPlay className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            type="button"
            onClick={restartAudio}
            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Restart introduction audio"
          >
            <FiRotateCcw className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Restart</span>
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={isMuted ? "Unmute introduction audio" : "Mute introduction audio"}
          >
            {isMuted ? (
              <FiVolumeX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <FiVolume2 className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
          </button>
        </div>
        <label className="ml-auto flex items-center gap-2 text-xs uppercase tracking-wide text-white/80">
          Volume
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Adjust introduction audio volume"
            className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-white/40 accent-white"
          />
        </label>
      </div>

      <audio ref={audioRef} src="/intro.mp3" preload="none" aria-hidden="true" />
    </div>
  );
};

export default IntroAudioPlayer;
