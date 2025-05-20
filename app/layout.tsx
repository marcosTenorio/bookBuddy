import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { ReadingListProvider } from './context/ReadingListContext'
import { SearchProvider } from './context/SearchContext'

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReadingListProvider>
          <SearchProvider>
            <div className="min-h-screen flex flex-col">
              <header className="bg-gray-400 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <Link
                      href="/"
                      className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                      <span className="text-lg sm:text-xl font-semibold">
                        Book Buddy
                      </span>
                    </Link>
                    <nav>
                      <Link
                        href="/reading-list"
                        className="inline-flex items-center px-3 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        My Reading List
                      </Link>
                    </nav>
                  </div>
                </div>
              </header>
              <main className="flex-1 bg-gray-50">{children}</main>
            </div>
          </SearchProvider>
        </ReadingListProvider>
      </body>
    </html>
  )
}
