import { AlertTriangle } from 'lucide-react'

export default function Disclaimer({ compact = false }) {
  if (compact) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
        <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5 text-yellow-500" />
        Visa requirements change frequently. Always verify with the official embassy before booking.
      </p>
    )
  }

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Important Disclaimer</p>
        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
          Visa requirements change frequently. This data is for reference only — always verify with the
          official embassy or consulate of your destination country before booking travel.
        </p>
      </div>
    </div>
  )
}
