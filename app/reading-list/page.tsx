'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Book from '../components/Book'
import BookSkeleton from '../components/BookSkeleton'
import Button from '../components/ui/Button'
import { useReadingList } from '../context/ReadingListContext'
import { useSearch } from '../context/SearchContext'

export default function ReadingList() {
  const { readingList } = useReadingList()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const { searchQuery } = useSearch()

  useEffect(() => {
    // Simulate loading time to prevent flash of empty state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleBackToSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set('q', searchQuery)
      params.set('page', '1')
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <main className="min-h-screen p-8">
      <Button
        variant="ghost"
        onClick={handleBackToSearch}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Search
      </Button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Reading List
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          </div>
        ) : readingList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              Your reading list is empty
            </p>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Search for books to add to your list
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {readingList.map((book, index) => (
              <Book key={`${book.title}-${index}`} book={book} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
