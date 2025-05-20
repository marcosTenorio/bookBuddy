import { SearchProvider } from '@/app/context/SearchContext'
import Home from '@/app/page'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'
import '@testing-library/jest-dom'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('SearchForm', () => {
  const mockPush = jest.fn()
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    // Setup router mock
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    // Setup search params mock
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
  })

  it('renders search form', () => {
    render(
      <SearchProvider>
        <Home />
      </SearchProvider>
    )

    expect(screen.getByPlaceholderText(/search for books/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Search books' })
    ).toBeInTheDocument()
  })

  it('can type in search input', () => {
    render(
      <SearchProvider>
        <Home />
      </SearchProvider>
    )

    const searchInput = screen.getByPlaceholderText(/search for books/i)
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    expect(searchInput).toHaveValue('Harry Potter')
  })

  it('submits search form and updates URL', () => {
    render(
      <SearchProvider>
        <Home />
      </SearchProvider>
    )

    const searchInput = screen.getByPlaceholderText(/search for books/i)
    const searchButton = screen.getByRole('button', { name: 'Search books' })

    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })
    fireEvent.click(searchButton)

    expect(mockPush).toHaveBeenCalledWith('/?q=Harry+Potter&page=1')
  })

  it('shows clear button when there is input', () => {
    render(
      <SearchProvider>
        <Home />
      </SearchProvider>
    )

    const searchInput = screen.getByPlaceholderText(/search for books/i)
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })

    expect(
      screen.getByRole('button', { name: 'Clear search' })
    ).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', () => {
    render(
      <SearchProvider>
        <Home />
      </SearchProvider>
    )

    const searchInput = screen.getByPlaceholderText(/search for books/i)
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } })

    const clearButton = screen.getByRole('button', { name: 'Clear search' })
    fireEvent.click(clearButton)

    expect(searchInput).toHaveValue('')
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
