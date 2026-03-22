import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { PROFILES } from '../../utils/constants'
import { useProfileStore } from '../../store/useProfileStore'
import ProfileFlag from '../ui/ProfileFlag'

export default function ProfileSelector() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const activeProfile = useProfileStore(s => s.activeProfile)
  const setProfile = useProfileStore(s => s.setProfile)

  const current = PROFILES.find(p => p.key === activeProfile) ?? PROFILES[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
        aria-label="Select travel document profile"
      >
        <ProfileFlag codes={current.codes} />
        <span className="hidden sm:inline">{current.short}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Travel Documents
            </p>
          </div>
          {PROFILES.map(profile => (
            <button
              key={profile.key}
              onClick={() => { setProfile(profile.key); setOpen(false) }}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <ProfileFlag codes={profile.codes} size="1.5rem" />
              <span className="flex-1 text-sm text-gray-800 dark:text-gray-200">{profile.label}</span>
              {activeProfile === profile.key && (
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
