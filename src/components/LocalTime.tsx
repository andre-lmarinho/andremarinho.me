"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const read = () =>
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

    read();

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(
      () => {
        read();
        interval = setInterval(read, 60_000);
      },
      (60 - new Date().getSeconds()) * 1000,
    );

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {now ?? "--:--"}
    </span>
  );
}
