'use client'

import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps'
import { COUNTRIES } from '@/lib/countries'
const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type Props = {
  selectedCode: string | null
  onSelect: (numericId: string) => void
}

export function WorldMap({ selectedCode, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#09121d]">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        className="h-full w-full"
        aria-label="Mapa-múndi interativo. Clique em um país para ver as notícias."
      >
        <Sphere
          id="sphere"
          stroke="var(--border)"
          strokeWidth={0.5}
          fill="var(--card)"
        />
        <Graticule stroke="var(--border)" strokeWidth={0.3} />
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const info = COUNTRIES[geo.id as string]
              const isAvailable = Boolean(info)
              const isSelected = isAvailable && info!.code === selectedCode
              const isHovered = hovered === geo.rsmKey

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  role="button"
                  aria-label={
                    isAvailable
                      ? `Ver notícias de ${info!.name}`
                      : 'País sem cobertura disponível'
                  }
                  tabIndex={isAvailable ? 0 : -1}
                  onClick={() => {
                    if (isAvailable) onSelect(geo.id as string)
                  }}
                  onMouseEnter={() => setHovered(geo.rsmKey)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: {
                      fill: isSelected
                        ? 'var(--primary)'
                        : isAvailable
                          ? 'oklch(0.4 0.05 220)'
                          : 'oklch(0.28 0.02 264)',
                      stroke: 'var(--background)',
                      strokeWidth: 0.4,
                      outline: 'none',
                      transition: 'fill 150ms ease',
                    },
                    hover: {
                      fill: isAvailable
                        ? isSelected
                          ? 'var(--primary)'
                          : 'oklch(0.6 0.12 200)'
                        : 'oklch(0.32 0.02 264)',
                      outline: 'none',
                      cursor: isAvailable ? 'pointer' : 'default',
                    },
                    pressed: {
                      fill: 'var(--primary)',
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

    </div>
  )
}
