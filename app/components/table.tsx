import clsx from 'clsx'

type Blank = null | undefined | false | 0 | ''

export interface Column<T> {
  title: React.ReactNode
  value: (row: T, rowIndex: number) => React.ReactNode | React.ReactNode[]
  className?: string
}

export interface TableProps<T> {
  columns: Array<Column<T> | Blank>
  rows: T[]
  rowClassName?: (row: T, rowIndex: number) => string
  fullWidth?: boolean
  compact?: boolean
  divide?: boolean
}

export function Table<T>({
  columns,
  rows,
  rowClassName,
  fullWidth,
  compact,
  divide = true
}: TableProps<T>): JSX.Element {
  if (!columns && rows) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    columns = Object.keys(rows[0] as any).map(key => ({
      title: key,
      className: undefined,
      value: (row: any) => row[key].toString()
    }))
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className={clsx('py-2 align-middle inline-block sm:px-6 lg:px-8', fullWidth && 'min-w-full')}>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns
                    .filter((c): c is Column<T> => !!c)
                    .map(({ title, className }, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={clsx(
                          compact ? 'px-2 py-0.5 text-[10px]' : 'px-4 py-2 text-xs',
                          'text-left font-medium text-gray-500 uppercase tracking-wider',
                          className
                        )}
                      >
                        {title}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={clsx('bg-white', divide && 'divide-y divide-gray-200')}>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowClassName && rowClassName(row, rowIndex)}>
                    {columns
                      .filter((c): c is Column<T> => !!c)
                      .map(({ value, className }, colIndex) => (
                        <td
                          key={colIndex}
                          className={clsx(
                            compact ? 'px-2 py-1 text-[12px]' : 'px-4 py-2 text-sm',
                            'whitespace-nowrap font-medium text-gray-900 align-top',
                            className
                          )}
                        >
                          {value(row, rowIndex)}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
