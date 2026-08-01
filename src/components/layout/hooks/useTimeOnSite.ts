"use client";

import { useEffect, useState } from "react";

const TIME_KEY = "total-time-on-site";
const pad = (value: number) => String(value).padStart(2, "0");

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const value = `${pad(minutes)}:${pad(seconds % 60)}`;

  return hours > 0 ? `${hours}:${value}` : value;
}

export default function useTimeOnSite() {
  const [timeOnSite, setTimeOnSite] = useState("00:00");

  useEffect(() => {
    const startedAt = Date.now();
    const previousSeconds = Number(localStorage.getItem(TIME_KEY)) || 0;
    const elapsed = () => Math.floor((Date.now() - startedAt) / 1000);
    const update = () => setTimeOnSite(formatTime(previousSeconds + elapsed()));
    const save = () =>
      localStorage.setItem(TIME_KEY, String(previousSeconds + elapsed()));

    update();
    const interval = setInterval(update, 1000);
    window.addEventListener("beforeunload", save);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", save);
      save();
    };
  }, []);

  return timeOnSite;
}
