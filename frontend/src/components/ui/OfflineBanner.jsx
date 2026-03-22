import { WifiOff } from 'lucide-react'
import { useOfflineStatus } from '../../hooks/useOfflineStatus'

export default function OfflineBanner() {
  const isOffline = useOfflineStatus()
  if (!isOffline) return null

  return (
    <div className="bg-yellow-500 text-white text-sm px-4 py-2 flex items-center gap-2 justify-center">
      <WifiOff className="w-4 h-4 flex-shrink-0" />
      <span>You're offline — showing cached data. Travel list changes may not be saved.</span>
    </div>
  )
}
