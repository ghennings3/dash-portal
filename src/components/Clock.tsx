"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="h-[140px]" />; // Skeleton placeholder

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(time);

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4 select-none animate-in fade-in duration-1000">
      <div className="flex items-baseline text-8xl md:text-[8rem] font-light tracking-tight text-zinc-100">
        <span>{hours}:{minutes}</span>
        <span className="text-5xl md:text-6xl text-zinc-600 ml-4 font-normal tabular-nums">
          {seconds}
        </span>
      </div>
      <p className="text-zinc-500 text-base md:text-lg capitalize font-medium">
        {formattedDate}
      </p>
    </div>
  );
}
