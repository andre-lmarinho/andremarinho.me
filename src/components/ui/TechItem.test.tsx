import React from 'react';
import { render } from '@testing-library/react';
import TechItem from './TechItem';
import placeholder from '@/assets/icons/placeholder.svg';

describe('TechItem', () => {
  it('falls back to placeholder on load error', () => {
    const { getByRole } = render(<TechItem name="React" icon="react" color="61DAFB" />);
    const img = getByRole('img') as HTMLImageElement;
    img.dispatchEvent(new Event('error'));
    expect(img.src).toBe(placeholder);
  });
});
