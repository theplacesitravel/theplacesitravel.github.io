import { REGIONS } from '../../utils/constants'
import { useFilterStore } from '../../store/useFilterStore'

export default function RegionFilter() {
  const { selectedRegion, setRegion } = useFilterStore()

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => setRegion(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          !selectedRegion
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        All Regions
      </button>
      {REGIONS.map(region => (
        <button
          key={region}
          onClick={() => setRegion(selectedRegion === region ? null : region)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedRegion === region
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  )
}
