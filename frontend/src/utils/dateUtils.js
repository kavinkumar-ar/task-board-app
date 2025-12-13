import { isPast, isFuture, differenceInDays, format, parseISO } from 'date-fns';

/**
 * Check if a date is overdue (in the past)
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean}
 */
export const isOverdue = (dateString) => {
  if (!dateString) return false;
  try {
    const date = parseISO(dateString);
    return isPast(date) && differenceInDays(new Date(), date) > 0;
  } catch (error) {
    return false;
  }
};

/**
 * Check if a date is due soon (within 2-3 days)
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean}
 */
export const isDueSoon = (dateString) => {
  if (!dateString) return false;
  try {
    const date = parseISO(dateString);
    const daysUntilDue = differenceInDays(date, new Date());
    return daysUntilDue >= 0 && daysUntilDue <= 3;
  } catch (error) {
    return false;
  }
};

/**
 * Format a date string for display
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

/**
 * Get today's date in YYYY-MM-DD format (for date input)
 * @returns {string}
 */
export const getTodayDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

