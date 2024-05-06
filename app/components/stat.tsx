import clsx from 'clsx'

export interface StatGroupProps {
  cols?: number
  children: React.ReactNode
}

export function StatGroup({ children, cols = 3 }: StatGroupProps): JSX.Element {
  // tailwindcss purger scans for full class names
  let gridColsClass = 'sm:grid-cols-3'
  if (cols === 1) gridColsClass = 'sm:grid-cols-1'
  if (cols === 2) gridColsClass = 'sm:grid-cols-2'
  if (cols === 3) gridColsClass = 'sm:grid-cols-3'
  if (cols === 4) gridColsClass = 'sm:grid-cols-4'
  if (cols === 5) gridColsClass = 'sm:grid-cols-5'
  return <dl className={clsx('grid grid-cols-1 gap-5', gridColsClass)}>{children}</dl>
}

export interface StatProps {
  title: React.ReactNode
  children: React.ReactNode
}

export function Stat({ title, children }: StatProps): JSX.Element {
  return (
    <div className="px-4 py-5 bg-white shadow rounded-sm overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className="mt-1 text-2xl md:text-3xl font-semibold text-gray-900">{children}</dd>
    </div>
  )
}
