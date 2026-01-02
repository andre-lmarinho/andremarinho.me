import { TextLink } from '@/components/TextLink';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    TextLink,
    ...components,
  };
}
