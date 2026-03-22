import ReactCountryFlag from 'react-country-flag'

export default function ProfileFlag({ codes, size = '1.25rem' }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {codes.map(code => (
        <ReactCountryFlag
          key={code}
          countryCode={code}
          svg
          style={{ width: size, height: size }}
          className="rounded-sm"
        />
      ))}
    </span>
  )
}
