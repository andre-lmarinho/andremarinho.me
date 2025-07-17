import { fireEvent } from '@testing-library/react';

const userEvent = {
  async click(element: Element | Document | Window) {
    fireEvent.click(element);
  },
};

export default userEvent;
