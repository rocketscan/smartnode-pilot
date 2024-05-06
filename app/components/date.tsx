import dayjs from 'dayjs'

export interface DateProps {
  children: number | string | null | undefined
  time?: boolean
}

export function Date({ children: timestamp, time = false }: DateProps): JSX.Element | null {
  if (!timestamp) return null
  const value = typeof timestamp === 'string' ? timestamp : timestamp * 1000
  const date = new globalThis.Date(value)
  return <span title={date.toISOString()}>{formatDate(date, time)}</span>
}

function formatDate(date: Date, time: boolean): string {
  let format = 'MMM D, YYYY'
  if (date.getFullYear() === new globalThis.Date().getFullYear()) format = 'MMM D'
  if (time) format += ' HH:mm:ss'
  return dayjs(date).format(format)
}
