import { describe, test, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// Custom matcher for className checks
expect.extend({
  toHaveClass(received, className) {
    const pass = received.classList.contains(className);
    return {
      pass,
      message: () =>
        `expected ${received} ${pass ? 'not to' : 'to'} have class "${className}"`,
    };
  },
});

describe('Course Selection App', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Term Selection', () => {
    test('should default to Fall term', async () => {
      const { findByRole } = render(<App />);
      const fallButton = await findByRole('button', { name: /fall/i });
      
      await waitFor(() => {
        const buttonClasses = Array.from(fallButton.classList);
        expect(buttonClasses.some(cls => cls.includes('green'))).toBe(true);
      });
    });
  
    test('should switch to Winter term when Winter button is clicked', async () => {
      const { findByRole, findByText } = render(<App />);
      const winterButton = await findByRole('button', { name: /winter/i });
      
      fireEvent.click(winterButton);
      
      await waitFor(() => {
        const buttonClasses = Array.from(winterButton.classList);
        expect(buttonClasses.some(cls => cls.includes('green'))).toBe(true);
      });
      
      // Verify Winter courses are displayed
      expect(await findByText('Winter CS 110')).toBeTruthy();
    });
  });
  
  describe('Course Selection', () => {
    test('should highlight selected course in green', async () => {
      const { findByText } = render(<App />);
      const courseElement = await findByText('Fall CS 110');
      const courseDiv = courseElement.closest('div');
      
      fireEvent.click(courseDiv);
      
      await waitFor(() => {
        const divClasses = Array.from(courseDiv.classList);
        expect(divClasses.some(cls => cls.includes('green'))).toBe(true);
      });
    });
  });

  describe('Time Conflict Handling', () => {
    test('should disable courses with time conflicts', async () => {
      const { findByText } = render(<App />);
      // Select a course that runs MWF 11:00-11:50
      const course1 = (await findByText('Fall CS 101')).closest('div');
      fireEvent.click(course1);
      
      // Find another course with the same time slot
      const conflictingCourse = (await findByText('Fall CS 110')).closest('div');
      expect(conflictingCourse.classList.contains('opacity-50')).toBe(true);
      
      // Try to select conflicting course
      fireEvent.click(conflictingCourse);
      expect(conflictingCourse.classList.contains('bg-green-200')).toBe(false);
    });

    test('should not allow selection of courses with time conflicts', async () => {
      const { findByText, queryByText } = render(<App />);
      // Select first course
      const course1 = (await findByText('Fall CS 101')).closest('div');
      fireEvent.click(course1);
      
      // Try to select conflicting course
      const conflictingCourse = (await findByText('Fall CS 110')).closest('div');
      fireEvent.click(conflictingCourse);
      
      // Open Course Plan
      const coursePlanButton = await findByText('Course Plan');
      fireEvent.click(coursePlanButton);
      
      // Verify only first course is in plan
      expect(await findByText(/Fall CS 101/)).toBeTruthy();
      expect(queryByText(/Fall CS 110/)).toBeFalsy();
    });
  });

  describe('Course Plan Management', () => {
    test('should allow removing courses from Course Plan', async () => {
      const { findByText, queryByText } = render(<App />);
      // Select a course
      const course = (await findByText('Fall CS 110')).closest('div');
      fireEvent.click(course);
      
      // Open Course Plan
      const coursePlanButton = await findByText('Course Plan');
      fireEvent.click(coursePlanButton);
      
      // Click X button (assuming it exists in your implementation)
      const removeButton = await findByText('×');
      fireEvent.click(removeButton);
      
      expect(queryByText(/Fall CS 110/)).toBeFalsy();
    });

    test('should persist Course Plan when switching terms', async () => {
      const { findByText } = render(<App />);
      // Select Fall course
      const fallCourse = (await findByText('Fall CS 110')).closest('div');
      fireEvent.click(fallCourse);
      
      // Switch to Winter
      const winterButton = await findByText('Winter');
      fireEvent.click(winterButton);
      
      // Select Winter course
      const winterCourse = (await findByText('Winter CS 111')).closest('div');
      fireEvent.click(winterCourse);
      
      // Open Course Plan
      const coursePlanButton = await findByText('Course Plan');
      fireEvent.click(coursePlanButton);
      
      // Verify both courses are in plan
      expect(await findByText(/Fall CS 110/)).toBeTruthy();
      expect(await findByText(/Winter CS 111/)).toBeTruthy();
    });
  });

  describe('Course Time Slots', () => {
    test('should correctly identify time conflicts between MWF courses', async () => {
      const { findByText } = render(<App />);
      
      // Select a MWF course
      const course1 = (await findByText('Fall CS 101')).closest('div');
      fireEvent.click(course1);
      
      // Verify that other MWF courses at the same time are disabled
      const conflictingCourse = (await findByText('Fall CS 110')).closest('div');
      expect(conflictingCourse.classList.contains('opacity-50')).toBe(true);
    });

    test('should correctly identify time conflicts between TuTh courses', async () => {
      const { findByText } = render(<App />);
      
      // Select a TuTh course
      const course1 = (await findByText('Fall CS 213-1')).closest('div');  // TuTh 15:30-16:50
      fireEvent.click(course1);
      
      // Verify that other TuTh courses with overlapping times are disabled
      const conflictingCourse = (await findByText('Fall CS 214')).closest('div');  // TuTh 9:30-10:50
      expect(conflictingCourse.classList.contains('opacity-50')).toBe(false);  // Should not conflict
    });
  });
});