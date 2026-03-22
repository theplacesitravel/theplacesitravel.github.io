import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/countries'
import { useProfileStore } from '../store/useProfileStore'
import { useFilterStore } from '../store/useFilterStore'

export function useCountries() {
  const activeProfile = useProfileStore(s => s.activeProfile)
  const { searchQuery, selectedRegion, selectedStatuses } = useFilterStore()

  return useQuery({
    queryKey: ['countries', activeProfile, searchQuery, selectedRegion, selectedStatuses],
    queryFn: () => fetchCountries({
      profile: activeProfile,
      search: searchQuery || undefined,
      region: selectedRegion || undefined,
      status: selectedStatuses.length > 0 ? selectedStatuses.join(',') : undefined,
    }),
    staleTime: 1000 * 60 * 60,      // 1 hour
    gcTime: 1000 * 60 * 60 * 24,    // 24 hours
    networkMode: 'offlineFirst',
  })
}
