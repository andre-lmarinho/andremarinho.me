// src/utils/isDesktop

export default function isDesktop(): boolean {
  return typeof window !== 'undefined' && window.innerWidth >= 768;
}
