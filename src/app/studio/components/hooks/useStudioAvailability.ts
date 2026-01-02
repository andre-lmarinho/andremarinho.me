"use client";

import { useEffect, useState } from "react";

import { toSlots } from "@/app/studio/components/utils/availability";
import type { AvailabilityResponse } from "@/utils/api/studio/availability";

let cachedSlots: number | null = null;
let pendingSlots: Promise<number> | null = null;

const fetchSlots = async () => {
  const response = await fetch("/api/availability");
  if (!response.ok) {
    return 0;
  }
  const data = (await response.json()) as AvailabilityResponse | null;
  if (data && typeof data === "object" && "slots" in data) {
    return toSlots(data.slots);
  }
  return 0;
};

export const useStudioAvailability = (initialSlots = 0) => {
  const [slots, setSlots] = useState(() => cachedSlots ?? initialSlots);
  useEffect(() => {
    let isActive = true;

    if (cachedSlots !== null) {
      return () => {
        isActive = false;
      };
    }

    if (!pendingSlots) {
      pendingSlots = fetchSlots();
    }

    pendingSlots
      .then((value) => {
        cachedSlots = value;
        if (isActive) {
          setSlots(value);
        }
      })
      .catch(() => undefined);

    return () => {
      isActive = false;
    };
  }, []);
  return slots;
};
