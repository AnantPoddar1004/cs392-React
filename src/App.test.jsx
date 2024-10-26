import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

// describe('counter tests', () => {
    
//   test("Counter should be 0 at the start", () => {
//     render(<App />);
//     expect(screen.getByText('count is: 0')).toBeDefined();
//   });

//   test("Counter should increment by one when clicked", async () => {
//     render(<App />);
//     const counter = screen.getByRole('button');
//     fireEvent.click(counter);
//     expect(await screen.getByText('count is: 1')).toBeDefined();
//   });

// });

// describe('launching', () => {
//   it('should show the current year', () => {
//     render(<App />);
//     screen.getByText(/2018/);
//   });
// });

// describe('launching', () => {
//   it('should show the current year', async () => {
//     render(<App />);
//     await screen.findByText(/2018/); // need to await to ensure that the promise response has arrived. othwerise test will always pass
//   });
// });