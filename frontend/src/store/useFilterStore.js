import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  searchQuery: '',
  selectedRegion: null,
  selectedStatuses: [],
  setSearch: (q) => set({ searchQuery: q }),
  setRegion: (r) => set({ selectedRegion: r }),
  toggleStatus: (s) => set((state) => ({
    selectedStatuses: state.selectedStatuses.includes(s)
      ? state.selectedStatuses.filter(x => x !== s)
      : [...state.selectedStatuses, s]
  })),
  clearFilters: () => set({ searchQuery: '', selectedRegion: null, selectedStatuses: [] }),
}))
