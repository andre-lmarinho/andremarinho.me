import { buildAvailabilityResponse } from "@/utils/api/studio/availability";

export const runtime = "edge";

export const GET = () => buildAvailabilityResponse();
