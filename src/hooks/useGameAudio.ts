import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_KEY = "tien-lo-audio-enabled";
const BGM_URL = "/bgm.mp3";

type SoundEffect = "breakthrough" | "alchemy" | "resource";

function playTone(
  context: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function useGameAudio() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(AUDIO_KEY) === "true");
    } catch {
      /* Trình duyệt chặn bộ nhớ cục bộ. */
    }
    setReady(true);
  }, []);

  const getContext = useCallback(() => {
    if (!contextRef.current) contextRef.current = new AudioContext();
    return contextRef.current;
  }, []);

  const getBgm = useCallback(() => {
    if (!bgmRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.2;
      audio.preload = "none";
      audio.addEventListener("error", (event) => {
        // A missing/blocked optional soundtrack must not surface as a global
        // runtime error or interrupt the game; gameplay audio remains available.
        event.preventDefault();
        audio.removeAttribute("src");
        audio.load();
        bgmRef.current = null;
      }, { once: true });
      audio.src = BGM_URL;
      bgmRef.current = audio;
    }
    return bgmRef.current;
  }, []);

  const startMusic = useCallback(() => {
    const bgm = getBgm();
    void bgm.play().catch(() => {
      /* Trình duyệt chưa cho phát âm thanh, chờ thao tác tiếp theo. */
    });
  }, [getBgm]);

  const stopMusic = useCallback(() => {
    bgmRef.current?.pause();
  }, []);

  useEffect(() => {
    if (!ready || !enabled) {
      stopMusic();
      return;
    }
    const unlock = () => startMusic();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    startMusic();
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      stopMusic();
    };
  }, [enabled, ready, startMusic, stopMusic]);

  useEffect(() => {
    return () => {
      bgmRef.current?.pause();
      void contextRef.current?.close();
    };
  }, []);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      try {
        localStorage.setItem(AUDIO_KEY, String(next));
      } catch {
        /* Trình duyệt chặn bộ nhớ cục bộ. */
      }
      if (next) startMusic();
      else stopMusic();
      return next;
    });
  }, [startMusic, stopMusic]);

  const playSfx = useCallback((effect: SoundEffect) => {
    if (!enabled) return;
    const context = getContext();
    if (context.state !== "running") return;
    const start = context.currentTime + 0.01;

    if (effect === "breakthrough") {
      [523.25, 659.25, 783.99, 1046.5].forEach((note, index) =>
        playTone(context, note, start + index * 0.09, 0.75, 0.06, "sine"),
      );
    } else if (effect === "alchemy") {
      playTone(context, 174.61, start, 0.3, 0.05, "triangle");
      playTone(context, 698.46, start + 0.16, 0.7, 0.055, "sine");
      playTone(context, 880, start + 0.25, 0.55, 0.035, "sine");
    } else {
      playTone(context, 659.25, start, 0.25, 0.045, "sine");
      playTone(context, 987.77, start + 0.1, 0.35, 0.04, "sine");
    }
  }, [enabled, getContext]);

  return { enabled, ready, toggle, playSfx };
}
