import dayjs from 'dayjs';

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs,
  format: string
) => dayjs(date).format(format);

export const getTime = (date?: string | number | Date) => date
  ? new Date(date).getTime()
  : new Date().getTime();
