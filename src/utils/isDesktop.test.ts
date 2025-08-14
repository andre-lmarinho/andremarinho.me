import isDesktop from './isDesktop';

describe('isDesktop', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  it('returns true when width is at least 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
    expect(isDesktop()).toBe(true);
  });

  it('returns false when width is less than 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    expect(isDesktop()).toBe(false);
  });
});
