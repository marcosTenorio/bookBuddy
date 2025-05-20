import { Search, X } from 'lucide-react'
import type { FormEvent } from 'react'
import Button from './ui/Button'

interface SearchFormProps {
  searchQuery: string
  isSearching: boolean
  onSearch: (e: FormEvent) => void
  onClear: () => void
  onQueryChange: (query: string) => void
}

export default function SearchForm({
  searchQuery,
  isSearching,
  onSearch,
  onClear,
  onQueryChange,
}: SearchFormProps) {
  return (
    <form onSubmit={onSearch} className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Search for books by title or author..."
            className="w-full p-2.5 sm:p-3 pl-9 sm:pl-10 pr-9 sm:pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              icon={<X className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            />
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isSearching || searchQuery === ''}
          fullWidth
          icon={<Search className="w-4 h-4 sm:w-5 sm:h-5" />}
          className="sm:w-auto"
          aria-label="Search books"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  )
}
