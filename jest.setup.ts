import '@testing-library/jest-dom';

declare global {
  // React 19 expects this flag to be set when using act() in a custom test harness.
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
