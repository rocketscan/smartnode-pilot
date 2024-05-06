import { Truncate } from './truncate'

export interface AddressProps {
  children?: string
  truncate?: boolean
}

export function Address({ children, truncate = false }: AddressProps): JSX.Element {
  if (truncate) {
    return <Truncate length={12}>{children}</Truncate>
  } else {
    return <>{children}</>
  }
}
