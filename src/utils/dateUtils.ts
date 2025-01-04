import { format, isWithinInterval, addDays, parseISO } from 'date-fns';

export function formatDateTime(date: string | Date): string {
  return format(typeof date === 'string' ? parseISO(date) : date, 'PPp');
}

export function isUpcoming(date: string | Date, daysAhead = 7): boolean {
  const startDate = new Date();
  const endDate = addDays(startDate, daysAhead);
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  
  return isWithinInterval(checkDate, { start: startDate, end: endDate });
}