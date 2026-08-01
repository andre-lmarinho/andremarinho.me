"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  return <span className="tabular-nums">{time}</span>;
}
