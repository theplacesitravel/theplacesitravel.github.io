import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTravelList, addToTravelList, updateTravelListEntry, removeFromTravelList } from '../api/travelList'
import toast from 'react-hot-toast'

export function useTravelList(status) {
  return useQuery({
    queryKey: ['travel-list', status],
    queryFn: () => fetchTravelList(status),
    networkMode: 'offlineFirst',
    staleTime: 1000 * 60 * 5,
  })
}

export function useAllTravelList() {
  return useQuery({
    queryKey: ['travel-list'],
    queryFn: () => fetchTravelList(),
    networkMode: 'offlineFirst',
    staleTime: 1000 * 60 * 5,
  })
}

export function useAddToTravelList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: addToTravelList,
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['travel-list'] })
      toast.success(`Added to ${variables.status}`)
    },
    onError: () => toast.error('Failed to save. Are you online?'),
  })
}

export function useUpdateTravelList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ code, data }) => updateTravelListEntry(code, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['travel-list'] })
      toast.success('Updated')
    },
    onError: () => toast.error('Failed to update'),
  })
}

export function useRemoveFromTravelList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: removeFromTravelList,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['travel-list'] })
      toast.success('Removed from list')
    },
    onError: () => toast.error('Failed to remove'),
  })
}
