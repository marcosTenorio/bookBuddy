import type { BookData } from '@/app/components/Book'

export function formatBookTitle(title: string): string {
    if (!title) return ''
    return title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

export function getBookAuthors(book: BookData): string {
    if (!book.author_name || book.author_name.length === 0) return 'Unknown Author'
    return book.author_name.join(', ')
}

export function getBookYear(book: BookData): string {
    if (!book.first_publish_year) return 'Unknown Year'
    return book.first_publish_year.toString()
}
