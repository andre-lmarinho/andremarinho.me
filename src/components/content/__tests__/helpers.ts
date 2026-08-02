export function viewTransitionNames(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll<HTMLElement>("[style]"))
    .map((element) => element.style.getPropertyValue("view-transition-name"))
    .filter(Boolean);
}

export const duplicates = (values: string[]) =>
  values.filter((value, i) => values.indexOf(value) !== i);
