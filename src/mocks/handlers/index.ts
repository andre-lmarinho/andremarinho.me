import { apiHandlers } from "./api";
import { githubHandlers } from "./github";

export const handlers = [...githubHandlers, ...apiHandlers];
