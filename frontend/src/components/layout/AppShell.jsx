import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import OfflineBanner from '../ui/OfflineBanner'
import Disclaimer from '../ui/Disclaimer'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <OfflineBanner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 pb-20 md:pb-8">
        <Outlet />
      </main>
      <footer className="max-w-6xl mx-auto px-4 pb-24 md:pb-8">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
          <Disclaimer compact />
        </div>
      </footer>
      <BottomNav />
    </div>
  )
}
