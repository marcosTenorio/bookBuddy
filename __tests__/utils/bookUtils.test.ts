import type { BookData } from '@/app/components/Book'
import { formatBookTitle, getBookAuthors, getBookYear } from '@/lib/bookUtils'

describe('Book Utilities', () => {
    describe('formatBookTitle', () => {
        it('formats book title correctly', () => {
            expect(formatBookTitle('harry potter and the philosopher\'s stone')).toBe(
                'Harry Potter And The Philosopher\'s Stone'
            )
        })

        it('handles empty string', () => {
            expect(formatBookTitle('')).toBe('')
        })

        it('handles single word', () => {
            expect(formatBookTitle('harry')).toBe('Harry')
        })
    })

    describe('getBookAuthors', () => {
        it('returns formatted authors string', () => {
            const book: BookData = {
                title: 'Test Book',
                key: 'test-key-1',
                author_name: ['J.K. Rowling', 'Stephen King'],
            }
            expect(getBookAuthors(book)).toBe('J.K. Rowling, Stephen King')
        })

        it('returns "Unknown Author" when no authors', () => {
            const book: BookData = {
                title: 'Test Book',
                key: 'test-key-2',
            }
            expect(getBookAuthors(book)).toBe('Unknown Author')
        })

        it('returns "Unknown Author" when empty authors array', () => {
            const book: BookData = {
                title: 'Test Book',
                key: 'test-key-3',
                author_name: [],
            }
            expect(getBookAuthors(book)).toBe('Unknown Author')
        })
    })

    describe('getBookYear', () => {
        it('returns year as string', () => {
            const book: BookData = {
                title: 'Test Book',
                key: 'test-key-4',
                first_publish_year: 1997,
            }
            expect(getBookYear(book)).toBe('1997')
        })

        it('returns "Unknown Year" when no year', () => {
            const book: BookData = {
                title: 'Test Book',
                key: 'test-key-5',
            }
            expect(getBookYear(book)).toBe('Unknown Year')
        })
    })
})
