import moment from 'moment-jalaali';

/**
 * Formats a date value to Shamsi (Persian/Jalali) calendar format
 * @param value - Date object or date string
 * @param format - Optional format string (default: 'jYYYY/jMM/jDD')
 * @returns Formatted date string in Shamsi format or 'نامشخص' if invalid
 */
export const formatDate: (value: Date | string, format?: string) => string = (
  value,
  format = 'jYYYY/jMM/jDD',
) => {
  try {
    if (!value) {
      return 'نامشخص';
    }

    const parsed = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return 'نامشخص';
    }

    return moment(parsed).format(format);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'نامشخص';
  }
};

/**
 * Gets the timestamp value of a date for comparison purposes
 * @param value - Date object or date string
 * @returns Timestamp number or 0 if invalid
 */
export const getDateTimestamp: (value: Date | string) => number = (value) => {
  try {
    if (!value) {
      return 0;
    }

    const parsed = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return 0;
    }

    return moment(parsed).valueOf();
  } catch (error) {
    console.error('Error getting date timestamp:', error);
    return 0;
  }
};

