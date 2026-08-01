// jsdom does not expose `style.viewTransitionName` — it drops CSS properties it
// does not recognise — so the names have to be read back off the raw attribute.
const NAME = /view-transition-name:\s*([^;"]+)/g;

export function viewTransitionNames(container: HTMLElement): string[] {
  const names: string[] = [];

  for (const element of container.querySelectorAll("[style]")) {
    const style = element.getAttribute("style") ?? "";
    for (const match of style.matchAll(NAME)) names.push(match[1].trim());
  }

  return names;
}

export const duplicates = (values: string[]) =>
  values.filter((value, i) => values.indexOf(value) !== i);
