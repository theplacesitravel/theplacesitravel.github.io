export const PROFILES = [
  { key: 'np_only',   label: 'Nepal Passport Only',              short: 'Nepal Only',       codes: ['NP'] },
  { key: 'np_us_gc',  label: 'Nepal Passport + US Green Card',   short: 'Nepal + US GC',    codes: ['NP', 'US'] },
  { key: 'np_au_pr',  label: 'Nepal Passport + Australia PR',    short: 'Nepal + AU PR',    codes: ['NP', 'AU'] },
  { key: 'np_uk_ilr', label: 'Nepal Passport + UK ILR',          short: 'Nepal + UK ILR',   codes: ['NP', 'GB'] },
  { key: 'np_eu_pr',  label: 'Nepal Passport + EU/Schengen PR',  short: 'Nepal + EU PR',    codes: ['NP', 'EU'] },
  { key: 'np_nz_pr',  label: 'Nepal Passport + New Zealand PR',  short: 'Nepal + NZ PR',    codes: ['NP', 'NZ'] },
  { key: 'np_jp_pr',  label: 'Nepal Passport + Japan PR',        short: 'Nepal + JP PR',    codes: ['NP', 'JP'] },
]

export const VISA_STATUSES = [
  { key: 'visa_free',       label: 'Visa Free',         color: 'green' },
  { key: 'visa_on_arrival', label: 'Visa on Arrival',   color: 'teal' },
  { key: 'e_visa',          label: 'E-Visa',            color: 'blue' },
  { key: 'eta_required',    label: 'eTA Required',      color: 'cyan' },
  { key: 'visa_required',   label: 'Visa Required',     color: 'red' },
  { key: 'resident',        label: 'Home Country',      color: 'purple' },
]

export const REGIONS = [
  'Asia',
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Oceania',
  'Middle East',
]

export const STATUS_COLORS = {
  visa_free:       { bg: 'bg-green-100 dark:bg-green-900/30',  text: 'text-green-800 dark:text-green-300',  dot: 'bg-green-500' },
  visa_on_arrival: { bg: 'bg-teal-100 dark:bg-teal-900/30',   text: 'text-teal-800 dark:text-teal-300',    dot: 'bg-teal-500' },
  e_visa:          { bg: 'bg-blue-100 dark:bg-blue-900/30',   text: 'text-blue-800 dark:text-blue-300',    dot: 'bg-blue-500' },
  eta_required:    { bg: 'bg-cyan-100 dark:bg-cyan-900/30',   text: 'text-cyan-800 dark:text-cyan-300',    dot: 'bg-cyan-500' },
  visa_required:   { bg: 'bg-red-100 dark:bg-red-900/30',     text: 'text-red-800 dark:text-red-300',      dot: 'bg-red-500' },
  resident:        { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-300', dot: 'bg-purple-500' },
  unknown:         { bg: 'bg-gray-100 dark:bg-gray-800',      text: 'text-gray-600 dark:text-gray-400',    dot: 'bg-gray-400' },
}

export const TRAVEL_STATUSES = [
  { key: 'visited',  label: 'Visited',  emoji: '✅', color: 'text-green-600 dark:text-green-400' },
  { key: 'planned',  label: 'Planned',  emoji: '🗓️', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'wishlist', label: 'Wishlist', emoji: '⭐', color: 'text-yellow-600 dark:text-yellow-400' },
]
