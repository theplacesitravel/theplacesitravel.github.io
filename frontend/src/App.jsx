import { HashRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import PopularPage from './pages/PopularPage'
import NotFoundPage from './pages/NotFoundPage'
import { useThemeStore } from './store/useThemeStore'
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      retry: 1,
    }
  }
})

export default function App() {
  const init = useThemeStore(s => s.init)

  useEffect(() => {
    init()
  }, [init])

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:code" element={<CountryPage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
      <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
    </QueryClientProvider>
  )
}
