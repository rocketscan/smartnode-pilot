import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'

export interface LayoutProps {
  title: React.ReactNode
  menu?: LayoutMenuItem[]
  children: React.ReactNode
  footer: React.ReactNode
}

export interface LayoutMenuItem {
  text?: string
  path: string
}

export function Layout({ title, menu, children, footer }: LayoutProps): JSX.Element {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 pb-32">
        <nav className="bg-gradient-to-r from-orange-500 to-pink-500 border-b border-orange-400 border-opacity-25 lg:border-none">
          {menu && (
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative pt-4 lg:pt-0 mb-4 sm:h-16 lg:mb-0 flex flex-col lg:flex-row items-center justify-between lg:border-b lg:border-orange-400 lg:border-opacity-25">
                <div className="flex flex-col sm:flex-row sm:space-x-2">
                  {menu
                    .filter(({ text }) => !!text)
                    .map(({ text, path }, index) => (
                      <Link
                        key={index}
                        to={path}
                        className={clsx(
                          'text-white hover:bg-orange-600 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium',
                          location.pathname == path && 'bg-orange-700 text-white'
                        )}
                      >
                        {text}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </nav>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white text-center sm:text-left">{title}</h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-sm shadow px-5 py-6 sm:px-6" style={{ minHeight: '200px' }}>
            {children}
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <div className="block sm:inline">{footer}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
