import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const formatDate = (date: Date = new Date()): string => {
  return format(date, "yyyy-MM-dd");
};

export const formatDisplayDate = (date: Date = new Date()): string => {
  return format(date, "d MMMM yyyy", { locale: pl });
};

export const getTodaysDate = (): string => {
  return formatDate(new Date());
};

export const isSameDay = (date1: string, date2: string): boolean => {
  return date1 === date2;
};
