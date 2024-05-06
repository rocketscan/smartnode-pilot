export interface CardProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export function Card({ title, children }: CardProps): JSX.Element {
  return (
    <div className="bg-white overflow-hidden shadow rounded-sm">
      {title && (
        <div className="bg-white border-b border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="leading-6 font-medium text-gray-900 text-lg">{title}</h3>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
