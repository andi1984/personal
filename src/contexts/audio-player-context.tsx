import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AudioPlayerContextValue = {
  isPlaying: boolean;
  volume: number;
  currentTrack: string | null;
  tracks: string[];
  isLoading: boolean;
  analyser: AnalyserNode | null;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  setVolume: (volume: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

const VOLUME_STORAGE_KEY = "background-audio-volume";
const DEFAULT_VOLUME = 0.15;

function getRandomTrack(tracks: string[], excludeTrack?: string | null): string | null {
  if (tracks.length === 0) return null;
  if (tracks.length === 1) return tracks[0];

  const availableTracks = excludeTrack
    ? tracks.filter((t) => t !== excludeTrack)
    : tracks;

  if (availableTracks.length === 0) return tracks[0];

  const randomIndex = Math.floor(Math.random() * availableTracks.length);
  return availableTracks[randomIndex];
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [tracks, setTracks] = useState<string[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // Initialize Web Audio API (must be called after user interaction)
  const initializeAudioContext = useCallback(() => {
    if (audioContextRef.current || !audioRef.current) return;

    try {
      const ctx = new AudioContext();
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 64; // Small for subtle visualization
      analyserNode.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyserNode;
      sourceRef.current = source;
      setAnalyser(analyserNode);
    } catch {
      // Web Audio API not supported or already connected
    }
  }, []);

  // Load tracks on mount
  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch("/api/audio-tracks");
        const data = await response.json();
        setTracks(data.tracks || []);
      } catch {
        setTracks([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTracks();
  }, []);

  // Load volume from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(VOLUME_STORAGE_KEY);
      if (stored !== null) {
        const parsedVolume = parseFloat(stored);
        if (!isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) {
          setVolumeState(parsedVolume);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track ending - play random next track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const nextTrack = getRandomTrack(tracks, currentTrack);
      if (nextTrack) {
        setCurrentTrack(nextTrack);
        audio.src = `/audio/${nextTrack}`;
        audio.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(false);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [tracks, currentTrack]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    // Initialize audio context on first play (requires user interaction)
    initializeAudioContext();

    // Resume audio context if suspended
    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    // If no track is loaded, pick a random one
    if (!currentTrack) {
      const track = getRandomTrack(tracks);
      if (!track) return;
      setCurrentTrack(track);
      audio.src = `/audio/${track}`;
    }

    try {
      await audio.play();
    } catch {
      // Autoplay may be blocked
    }
  }, [tracks, currentTrack, initializeAudioContext]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(clampedVolume));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        volume,
        currentTrack,
        tracks,
        isLoading,
        analyser,
        play,
        pause,
        togglePlay,
        setVolume,
      }}
    >
      {children}
      <audio ref={audioRef} preload="none" aria-hidden="true" crossOrigin="anonymous" />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}
