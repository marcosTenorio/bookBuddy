import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisiblePages = 5
  let visiblePages = pages

  if (totalPages > maxVisiblePages) {
    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      ),
      1
    )
    visiblePages = pages.slice(start - 1, start - 1 + maxVisiblePages)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        icon={<ChevronLeft className="w-4 h-4" />}
      >
        Previous
      </Button>

      {visiblePages[0] > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(1)}
            className="w-8 h-8"
          >
            1
          </Button>
          {visiblePages[0] > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {visiblePages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onPageChange(page)}
          className="w-8 h-8"
        >
          {page}
        </Button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        icon={<ChevronRight className="w-4 h-4" />}
      >
        Next
      </Button>
    </div>
  )
}
