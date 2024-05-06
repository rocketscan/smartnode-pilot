import clsx from 'clsx'

export interface StackProps {
  children: React.ReactNode
  horizontal?: boolean
}

export function Stack({ children, horizontal }: StackProps): JSX.Element {
  return <div className={clsx('flex', horizontal ? 'flex-row' : 'flex-col', 'gap-5')}>{children}</div>
}
