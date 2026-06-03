"use client";
import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/** Лек видео плеър: брандиран постер + бутон „play"; при старт се пускат нативните контроли. */
export default function VideoPlayer({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    ref.current?.play();
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 ${className ?? ""}`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        onPlay={() => setStarted(true)}
        onPause={() => setStarted(true)}
        className="block h-auto w-full"
      />

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label="Пусни видеото"
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/5 transition-colors hover:bg-black/15"
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110">
            <svg className="ml-1 h-8 w-8 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
