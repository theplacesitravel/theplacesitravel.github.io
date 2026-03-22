import { useQuery } from '@tanstack/react-query'
import { fetchCountry } from '../api/countries'

export function useCountry(code) {
  return useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountry(code),
    enabled: !!code,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    networkMode: 'offlineFirst',
  })
}
