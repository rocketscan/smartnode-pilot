import { Truncate } from './truncate'

export interface TimezoneProps {
  children?: string
  truncate?: number
}

export function Timezone({ children: timezone, truncate = 32 }: TimezoneProps): JSX.Element | null {
  if (!timezone) return null
  return <Truncate length={truncate}>{timezone.replace(/_/g, ' ').replace(/\//g, ' / ')}</Truncate>
}
