'use client'

import { BookMinus, BookPlus, X } from 'lucide-react'
import { useState } from 'react'
import { useReadingList } from '../context/ReadingListContext'
import Button from './ui/Button'

export interface BookData {
  title: string
  key: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
  subjects?: string[]
  publisher?: string[]
  number_of_pages_median?: number
  language?: string[]
}

interface BookProps {
  book: BookData
}

export default function Book({ book }: BookProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToReadingList, removeFromReadingList, isInReadingList } =
    useReadingList()

  const isBookInList = isInReadingList(book)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsModalOpen(true)
    }
  }

  function handleReadingListToggle(e: React.MouseEvent) {
    e.stopPropagation()
    if (isBookInList) {
      removeFromReadingList(book)
    } else {
      addToReadingList(book)
    }
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        onKeyDown={handleKeyPress}
        className="w-full text-left bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      >
        {book.cover_i && (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}

        <h2 className="text-xl font-semibold mb-2 text-gray-600">
          {book.title}
        </h2>

        {book.author_name && (
          <p className="text-gray-600 mb-2">By {book.author_name.join(', ')}</p>
        )}

        {book.first_publish_year && (
          <p className="text-gray-500 text-sm">
            Published: {book.first_publish_year}
          </p>
        )}

        <Button
          variant={isBookInList ? 'danger' : 'primary'}
          size="sm"
          onClick={handleReadingListToggle}
          icon={
            isBookInList ? (
              <BookMinus className="w-4 h-4" />
            ) : (
              <BookPlus className="w-4 h-4" />
            )
          }
        >
          {isBookInList ? 'Remove from List' : 'Add to Reading List'}
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {book.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  icon={<X className="w-5 h-5" />}
                  aria-label="Close modal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {book.cover_i && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={`Cover of ${book.title}`}
                    className="w-full rounded-lg shadow-md"
                  />
                )}

                <div className="space-y-4">
                  {book.author_name && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Authors</h3>
                      <p className="text-gray-600">
                        {book.author_name.join(', ')}
                      </p>
                    </div>
                  )}

                  {book.first_publish_year && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Published</h3>
                      <p className="text-gray-600">{book.first_publish_year}</p>
                    </div>
                  )}

                  {book.publisher && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Publisher</h3>
                      <p className="text-gray-600">
                        {book.publisher.join(', ')}
                      </p>
                    </div>
                  )}

                  {book.number_of_pages_median && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Pages</h3>
                      <p className="text-gray-600">
                        {book.number_of_pages_median}
                      </p>
                    </div>
                  )}

                  {book.language && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Language</h3>
                      <p className="text-gray-600">
                        {book.language.join(', ')}
                      </p>
                    </div>
                  )}

                  {book.subjects && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Subjects</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.subjects.slice(0, 5).map(subject => (
                          <span
                            key={subject}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    variant={isBookInList ? 'danger' : 'primary'}
                    fullWidth
                    onClick={handleReadingListToggle}
                    icon={
                      isBookInList ? (
                        <BookMinus className="w-4 h-4" />
                      ) : (
                        <BookPlus className="w-4 h-4" />
                      )
                    }
                  >
                    {isBookInList
                      ? 'Remove from Reading List'
                      : 'Add to Reading List'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
