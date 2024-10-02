import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

describe('App Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('TaskList')).toBeTruthy();
  });
});
