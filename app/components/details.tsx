export interface DetailsCardProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
}

export function DetailsCard({ title, subtitle, children }: DetailsCardProps): JSX.Element {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-sm">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export interface DetailsProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
}

export function Details({ title, subtitle, children }: DetailsProps): JSX.Element {
  return (
    <DetailsCard title={title} subtitle={subtitle}>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">{children}</dl>
      </div>
    </DetailsCard>
  )
}

export interface DetailProps {
  title: React.ReactNode
  children: React.ReactNode
}

export function Detail({ title, children }: DetailProps): JSX.Element {
  return (
    <div className="py-4 sm:py-5 sm:px-6 sm:grid sm:gap-4 sm:grid-cols-3">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{children}</dd>
    </div>
  )
}

export interface MinidetailsProps {
  children: React.ReactNode
}

export function Minidetails({ children }: MinidetailsProps): JSX.Element {
  return <dl className="grid grid-cols-2 grid-cols-[max-content_1fr] gap-x-5">{children}</dl>
}

export interface MinidetailProps {
  title: React.ReactNode
  children: React.ReactNode
}

export function Minidetail({ title, children }: MinidetailProps): JSX.Element {
  return (
    <>
      <dt>{title}</dt>
      <dd>{children}</dd>
    </>
  )
}
