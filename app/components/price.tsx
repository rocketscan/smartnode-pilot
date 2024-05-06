import { Number, type NumberProps } from './number'

export interface PriceProps extends NumberProps {
  currency?: string | null
  autoPrecision?: boolean
}

export function Price({ value, children, currency, autoPrecision, ...props }: PriceProps): JSX.Element | null {
  value ??= children
  if (value === undefined || value === null || value === '') return null
  value = fromWei(BigInt(value.toString()))
  if (isNaN(value)) return null

  let minPrecision = props.minPrecision
  if (autoPrecision) {
    if (value >= 100) {
      minPrecision = 0
    } else if (value >= 1) {
      minPrecision = 2
    } else if (value >= 0.1) {
      minPrecision = 4
    } else {
      minPrecision = 6
    }
  }

  return <Number {...props} minPrecision={minPrecision} value={value} suffix={currency} />
}

export function ETH(props: Omit<PriceProps, 'currency'>): JSX.Element | null {
  return <Price {...props} currency="ETH" />
}

export function RPL(props: Omit<PriceProps, 'currency'>): JSX.Element | null {
  return <Price {...props} currency="RPL" />
}

export function RETH(props: Omit<PriceProps, 'currency'>): JSX.Element | null {
  return <Price {...props} currency="rETH" />
}

const precision = 7
const precisionBNDiv = 10n ** BigInt(18 - precision)
const precisionDiv = 10 ** precision

function fromWei(n: bigint): number {
  try {
    return globalThis.Number(n / precisionBNDiv) / precisionDiv
  } catch (e) {
    console.error(n, (n / precisionBNDiv).toString())
    return NaN
  }
}
