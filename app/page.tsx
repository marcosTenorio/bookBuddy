'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Book from './components/Book'
import BookSkeleton from './components/BookSkeleton'
import SearchForm from './components/SearchForm'
import Pagination from './components/ui/Pagination'
import { useSearch } from './context/SearchContext'

const BOOKS_PER_PAGE = 15

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    searchQuery,
    searchResults,
    isLoading: isSearching,
    error,
    setSearchQuery,
    setSearchResults,
    setIsLoading,
    setError,
  } = useSearch()

  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // Fetch books from Open Library API
  const fetchBooks = useCallback(
    async (query: string, pageNum: number) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            query
          )}&offset=${(pageNum - 1) * BOOKS_PER_PAGE + 1}&limit=${BOOKS_PER_PAGE}`
        )
        const data = await response.json()
        setSearchResults(data.docs || [])
        setTotalResults(data.numFound || 0)
      } catch (err) {
        setError('Failed to fetch books. Please try again.')
        console.error('Error fetching books:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [setSearchResults, setIsLoading, setError]
  )

  // Handle initial search from URL
  useEffect(() => {
    const query = searchParams.get('q')
    const pageParam = searchParams.get('page')

    if (query) {
      setSearchQuery(query)
      setPage(pageParam ? Number.parseInt(pageParam) : 1)
      fetchBooks(query, pageParam ? Number.parseInt(pageParam) : 1)
    }
  }, [searchParams, setSearchQuery, fetchBooks])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const params = new URLSearchParams()
    params.set('q', searchQuery)
    params.set('page', '1')
    router.push(`/?${params.toString()}`)
    setSearchResults([])
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/?${params.toString()}`)
    setSearchResults([])
    setPage(newPage)
  }

  const handleClear = () => {
    setSearchQuery('')
    setSearchResults([])
    setPage(1)
    setTotalResults(0)
    router.push('/')
  }

  const totalPages = Math.ceil(totalResults / BOOKS_PER_PAGE)

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
          Book Search
        </h1>

        <SearchForm
          searchQuery={searchQuery}
          isSearching={isSearching}
          onSearch={handleSearch}
          onClear={handleClear}
          onQueryChange={setSearchQuery}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
            {error}
          </div>
        )}

        {searchResults.length > 0 && !isSearching && (
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Showing {searchResults.length} of {totalResults} results
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {!isSearching &&
            searchResults.map((book, index) => (
              <Book key={`${book.title}-${index}`} book={book} />
            ))}
          {isSearching &&
            [...Array(6)].map((_, index) => <BookSkeleton key={index} />)}
        </div>

        {!isSearching &&
          searchResults.length === 0 &&
          searchQuery &&
          !error && (
            <p className="text-center text-sm sm:text-base text-gray-600 mt-6 sm:mt-8">
              No books found. Try a different search term.
            </p>
          )}

        {totalPages > 1 && (
          <div className="mt-6 sm:mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  )
}
