export interface SectionProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps): JSX.Element {
  return (
    <div className="bg-white overflow-hidden">
      <div className="bg-white border-b border-gray-200 shadow-sm rounded-sm px-2 py-4">
        <h3 className="leading-6 font-medium text-gray-900 text-lg break-all">{title}</h3>
      </div>
      <div className="mt-5 px-1 py-1">{children}</div>
    </div>
  )
}
