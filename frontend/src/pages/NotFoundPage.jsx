import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center py-24">
      <p className="text-6xl mb-4">🌍</p>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Page not found</h1>
      <Link to="/" className="text-blue-600 dark:text-blue-400 mt-3 inline-block hover:underline">
        ← Back to browse
      </Link>
    </div>
  )
}
