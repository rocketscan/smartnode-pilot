export interface TruncateProps {
  children: string | null | undefined
  length?: number
}

export function Truncate({ children: value, length = 12 }: TruncateProps): JSX.Element {
  if (value && length && value.length > length) {
    return (
      <span className="inline-flex">
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap inline-block"
          style={{ maxWidth: length + 'ch' }}
        >
          {value}
        </span>
      </span>
    )
  }
  return <>{value}</>
}
