import { render, fireEvent, screen } from '@testing-library/react';
import Searchbar from './Searchbar';

test('Testing basic render.', () => {
  render(<Searchbar />);
});