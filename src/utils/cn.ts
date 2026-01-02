import { cx } from "classix";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Array<string | false | null | undefined>) => twMerge(cx(...inputs));
