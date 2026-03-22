import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import ProfileSelector from '../profile/ProfileSelector'
import { useThemeStore } from '../../store/useThemeStore'

export default function Header() {
  const { dark, toggle } = useThemeStore()

  return (
    <header className="bg-blue-800 dark:bg-gray-900 text-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">✈️</span>
          <div className="leading-tight">
            <p className="font-bold text-base leading-none">Where can I go?</p>
            <p className="text-blue-200 text-xs leading-none mt-0.5 hidden sm:block">Visa requirements for Nepal passport</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link to="/" className="px-3 py-1.5 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors">
            Browse
          </Link>
          <Link to="/popular" className="px-3 py-1.5 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors">
            Popular
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ProfileSelector />
          <button
            onClick={toggle}
            className="p-1.5 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
