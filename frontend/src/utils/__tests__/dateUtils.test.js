import { isOverdue, isDueSoon, formatDate, getTodayDate } from '../dateUtils';
import { subDays, addDays, format } from 'date-fns';

describe('dateUtils', () => {
  describe('isOverdue', () => {
    test('returns true for past dates', () => {
      const pastDate = subDays(new Date(), 5);
      const dateString = format(pastDate, 'yyyy-MM-dd');
      expect(isOverdue(dateString)).toBe(true);
    });

    test('returns false for future dates', () => {
      const futureDate = addDays(new Date(), 5);
      const dateString = format(futureDate, 'yyyy-MM-dd');
      expect(isOverdue(dateString)).toBe(false);
    });

    test('returns false for today', () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      expect(isOverdue(today)).toBe(false);
    });

    test('returns false for null or undefined', () => {
      expect(isOverdue(null)).toBe(false);
      expect(isOverdue(undefined)).toBe(false);
      expect(isOverdue('')).toBe(false);
    });

    test('returns false for invalid date strings', () => {
      expect(isOverdue('invalid-date')).toBe(false);
    });
  });

  describe('isDueSoon', () => {
    test('returns true for dates within 3 days', () => {
      const soonDate = addDays(new Date(), 2);
      const dateString = format(soonDate, 'yyyy-MM-dd');
      expect(isDueSoon(dateString)).toBe(true);
    });

    test('returns true for today', () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      expect(isDueSoon(today)).toBe(true);
    });

    test('returns false for dates more than 3 days away', () => {
      const farDate = addDays(new Date(), 5);
      const dateString = format(farDate, 'yyyy-MM-dd');
      expect(isDueSoon(dateString)).toBe(false);
    });

    test('returns false for past dates', () => {
      const pastDate = subDays(new Date(), 2);
      const dateString = format(pastDate, 'yyyy-MM-dd');
      expect(isDueSoon(dateString)).toBe(false);
    });

    test('returns false for null or undefined', () => {
      expect(isDueSoon(null)).toBe(false);
      expect(isDueSoon(undefined)).toBe(false);
      expect(isDueSoon('')).toBe(false);
    });
  });

  describe('formatDate', () => {
    test('formats valid date string correctly', () => {
      const dateString = '2024-12-31';
      const formatted = formatDate(dateString);
      expect(formatted).toBe('Dec 31, 2024');
    });

    test('returns empty string for null or undefined', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
      expect(formatDate('')).toBe('');
    });

    test('returns original string for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('invalid-date');
    });
  });

  describe('getTodayDate', () => {
    test('returns today\'s date in YYYY-MM-DD format', () => {
      const today = getTodayDate();
      const expected = format(new Date(), 'yyyy-MM-dd');
      expect(today).toBe(expected);
    });
  });
});

