import type { MDXComponents } from "mdx/types";
import { TextLink } from "@/components/TextLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    TextLink,
    ...components,
  };
}
