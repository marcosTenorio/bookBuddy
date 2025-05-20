'use client'

export default function BookSkeleton() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-8 bg-gray-200 rounded w-full mt-2" />
    </div>
  )
}
