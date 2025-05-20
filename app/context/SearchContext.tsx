'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { BookData } from '../components/Book'

interface SearchContextType {
  searchQuery: string
  searchResults: BookData[]
  isLoading: boolean
  error: string | null
  page: number
  totalResults: number
  setSearchQuery: (query: string) => void
  setSearchResults: (results: BookData[]) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setPage: (page: number) => void
  setTotalResults: (total: number) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<BookData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // Load saved search results from localStorage on mount
  useEffect(() => {
    const savedResults = localStorage.getItem('searchResults')
    const savedQuery = localStorage.getItem('searchQuery')
    if (savedResults) {
      setSearchResults(JSON.parse(savedResults))
    }
    if (savedQuery) {
      setSearchQuery(savedQuery)
    }
  }, [])

  // Save search results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(searchResults))
    localStorage.setItem('searchQuery', searchQuery)
  }, [searchResults, searchQuery])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isLoading,
        error,
        page,
        totalResults,
        setSearchQuery,
        setSearchResults,
        setIsLoading,
        setError,
        setPage,
        setTotalResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
