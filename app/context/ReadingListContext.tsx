'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { BookData } from '../components/Book'

interface ReadingListContextType {
  readingList: BookData[]
  addToReadingList: (book: BookData) => void
  removeFromReadingList: (book: BookData) => void
  isInReadingList: (book: BookData) => boolean
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(
  undefined
)

export function ReadingListProvider({
  children,
}: { children: React.ReactNode }) {
  const [readingList, setReadingList] = useState<BookData[]>([])

  useEffect(() => {
    const savedList = localStorage.getItem('readingList')
    if (savedList) {
      setReadingList(JSON.parse(savedList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList))
  }, [readingList])

  const addToReadingList = (book: BookData) => {
    setReadingList(prev => [...prev, book])
  }

  const removeFromReadingList = (book: BookData) => {
    setReadingList(prev => prev.filter(b => b.key !== book.key))
  }

  const isInReadingList = (book: BookData) => {
    return readingList.some(b => b.key === book.key)
  }

  return (
    <ReadingListContext.Provider
      value={{
        readingList,
        addToReadingList,
        removeFromReadingList,
        isInReadingList,
      }}
    >
      {children}
    </ReadingListContext.Provider>
  )
}

export function useReadingList() {
  const context = useContext(ReadingListContext)
  if (context === undefined) {
    throw new Error('useReadingList must be used within a ReadingListProvider')
  }
  return context
}
