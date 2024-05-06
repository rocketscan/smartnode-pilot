export type NumberValue = string | number | null | undefined | false | bigint

export interface NumberProps {
  value?: NumberValue
  children?: NumberValue
  precision?: number
  minPrecision?: number
  suffix?: string | null
  perc?: boolean
}

export function Number({ value, children, precision, minPrecision, suffix, perc }: NumberProps): JSX.Element | null {
  value ??= children
  if (value === undefined || value === null || value === '' || value === false) return null
  let n = 'n/a'
  let parsed = NaN
  try {
    parsed = parseFloat(value.toString())
    if (!isNaN(parsed) && isFinite(parsed)) {
      if (perc) {
        parsed *= 100
        if (!suffix) suffix = '%'
        if (precision === null || precision === undefined) precision = 2
      }
      n = parsed.toLocaleString('en-US', {
        maximumFractionDigits: precision ?? minPrecision,
        minimumFractionDigits: minPrecision
      })
    }
  } catch (e) {
    console.error(value, e)
  }
  if (suffix) {
    if (suffix !== '%') {
      suffix = ' ' + suffix
    }
  } else {
    suffix = ''
  }
  return <>{n + suffix}</>
}
