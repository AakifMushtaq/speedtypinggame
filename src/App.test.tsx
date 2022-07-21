import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { TypingGameStore } from './stores/TypingGameStore';

test('renders learn react link', () => {
  render(<App typingGameStore={new TypingGameStore()} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
