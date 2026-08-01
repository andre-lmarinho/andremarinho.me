import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { viewTransitionNames } from "@/components/content/__tests__/helpers";
import MorphTitle from "../MorphTitle";

describe("MorphTitle", () => {
  it("names one span per word", () => {
    const { container } = render(
      <MorphTitle as="h3" title="Two Words" id="post-first" />,
    );

    expect(container).toMatchSnapshot();
  });

  // The index is the pairing key precisely so a repeated word still gets its own
  // name — two spans sharing one name would make the browser drop the whole
  // transition.
  it("gives a repeated word a distinct name", () => {
    const { container } = render(
      <MorphTitle as="h3" title="the thing and the other" id="post-first" />,
    );
    const names = viewTransitionNames(container);

    expect(new Set(names).size).toBe(names.length);
    expect(container).toMatchSnapshot();
  });

  // This is the contract the whole morph rests on: the list renders the title as
  // an h3 and the detail page as an h1, and the browser only pairs them because
  // both sides emit the same set of names.
  it("emits the same names whatever the heading level", () => {
    const list = render(
      <MorphTitle as="h3" title="Some Title" id="project-first" />,
    );
    const detail = render(
      <MorphTitle as="h1" title="Some Title" id="project-first" />,
    );

    expect(viewTransitionNames(detail.container)).toEqual(
      viewTransitionNames(list.container),
    );
  });

  it("scopes every name under the id it was given", () => {
    const { container } = render(
      <MorphTitle as="h1" title="Two Words" id="project-first" />,
    );

    expect(viewTransitionNames(container)).toEqual([
      "title-project-first-0",
      "title-project-first-1",
    ]);
  });

  // A word that wraps produces multiple box fragments, and the browser skips a
  // transition for any name attached to more than one box.
  it("keeps each word to a single box", () => {
    const { container } = render(
      <MorphTitle as="h3" title="Two Words" id="post-first" />,
    );

    for (const span of container.querySelectorAll("[style]")) {
      expect(span.classList.contains("inline-block")).toBe(true);
    }
  });
});
