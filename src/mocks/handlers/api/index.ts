import { HttpResponse, http } from "msw";

import availability from "./mocks/availability.json";

export const apiHandlers = [http.get("/api/availability", () => HttpResponse.json(availability))];
