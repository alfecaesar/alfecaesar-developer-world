import { useCallback, useEffect, useRef, useState } from "react";

type AudioGraph = { context: AudioContext; master: GainNode };

// A soft major-seventh pad, synthesized so no audio file has to download.
const PAD_FREQUENCIES = [130.81, 164.81, 196.0, 246.94];

function buildPad(): AudioGraph {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0;
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(master);
  master.connect(context.destination);

  PAD_FREQUENCIES.forEach((frequency, i) => {
    const oscillator = context.createOscillator();
    oscillator.type = i % 2 === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    const gain = context.createGain();
    gain.gain.value = 0.05;
    // Slow tremolo keeps the pad breathing
    const lfo = context.createOscillator();
    lfo.frequency.value = 0.08 + i * 0.03;
    const lfoGain = context.createGain();
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain).connect(gain.gain);
    oscillator.connect(gain).connect(filter);
    oscillator.start();
    lfo.start();
  });
  return { context, master };
}

/** Optional ambient background sound. Off by default; starts only on click. */
export function useAmbientAudio() {
  const graph = useRef<AudioGraph | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (!("AudioContext" in window)) return;
    graph.current ??= buildPad();
    const { context, master } = graph.current;
    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    if (playing) {
      master.gain.setTargetAtTime(0, now, 0.4);
      setPlaying(false);
    } else {
      void context.resume();
      master.gain.setTargetAtTime(0.6, now, 0.8);
      setPlaying(true);
    }
  }, [playing]);

  useEffect(
    () => () => {
      void graph.current?.context.close();
      graph.current = null;
    },
    [],
  );

  return { playing, toggle };
}
