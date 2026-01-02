import { render, screen } from "@testing-library/react";

jest.mock("node:fs/promises", () => ({
  readFile: jest.fn(async () => Buffer.alloc(8)),
}));

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("buildOg (OpengraphImage)", () => {
  it("builds the element and init (fonts) correctly", async () => {
    const { buildOg } = await import("@/components/OpengraphImage");

    const props = { title: "André Marinho", description: "This is a description test." };

    const [element, init] = await buildOg(props);

    expect(Array.isArray(init.fonts)).toBe(true);
    expect(init.fonts).toHaveLength(3);
    const { readFile } = await import("node:fs/promises");
    expect((readFile as unknown as jest.Mock).mock.calls.length).toBe(3);

    const { container } = render(element);
    expect(container.firstChild).toMatchSnapshot();

    screen.getByText("André Marinho");
    screen.getByText("This is a description test.");
    screen.getByText("andremarinho.me");
  });

  it("renders the scoped URL when provided", async () => {
    const { buildOg } = await import("@/components/OpengraphImage");

    const [element] = await buildOg({
      title: "About me",
      description: "Learn about Andre",
      url: "about",
    });

    render(element);
    expect(screen.getByText("andremarinho.me/about")).toBeInTheDocument();
  });
});
