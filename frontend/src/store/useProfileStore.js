import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProfileStore = create(
  persist(
    (set) => ({
      activeProfile: 'np_only',
      setProfile: (profile) => set({ activeProfile: profile }),
    }),
    { name: 'visa-tracker-profile' }
  )
)
