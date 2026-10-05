import { useEffect, useRef, useState } from "react"

const tabs = [
  { id: "panorama", label: "Panorama" },
  { id: "sectores-y-etapas", label: "Sectores y etapas" },
  { id: "medellin-vs-bogota", label: "Medellín vs Bogotá" },
  { id: "inversores", label: "Inversores" },
  { id: "capital-institucional", label: "Capital institucional" },
  { id: "startups-y-salidas", label: "Startups y salidas" },
]

const investmentData = [
  { year: "2021", value: 1713, change: "—", display: "≈1713" },
  { year: "2022", value: 1829, change: "+6.8%", display: "≈1829" },
  { year: "2023", value: 788, change: "-56.9%", display: "≈788" },
  { year: "2024", value: 765, change: "-2.9%", display: "≈765" },
  { year: "2025", value: 850, change: "+11.1%", display: "≈850" },
  { year: "2026", value: 140, change: "-83.5%", display: "≈140" },
]

const dealsData = [
  {
    year: "2021",
    deals: 197,
    average: 8.7,
    change: "—",
    dealsDisplay: "≈197",
    averageDisplay: "≈8.7",
  },
  {
    year: "2022",
    deals: 255,
    average: 7.2,
    change: "+29%",
    dealsDisplay: "≈255",
    averageDisplay: "≈7.2",
  },
  {
    year: "2023",
    deals: 159,
    average: 4.9,
    change: "-38%",
    dealsDisplay: "≈159",
    averageDisplay: "≈4.9",
  },
  {
    year: "2024",
    deals: 117,
    average: 6.5,
    change: "-26%",
    dealsDisplay: "≈117",
    averageDisplay: "≈6.5",
  },
  {
    year: "2025",
    deals: 98,
    average: 8.6,
    change: "-16%",
    dealsDisplay: "≈98",
    averageDisplay: "≈8.6",
  },
  {
    year: "2026",
    deals: 13,
    average: 10.8,
    change: "-87%",
    dealsDisplay: "≈13",
    averageDisplay: "≈10.8",
  },
]

const macroData = [
  { year: "2021", intensity: 0.54, perCapita: 34.1 },
  { year: "2022", intensity: 0.53, perCapita: 37.3 },
  { year: "2023", intensity: 0.22, perCapita: 16.0 },
  { year: "2024", intensity: 0.18, perCapita: 15.4 },
  { year: "2025", intensity: 0.19, perCapita: 17.1 },
]

const indicators = [
  {
    label: "Inversión VC Total en Medellín",
    value: "USD 645.7M",
    detail: "2021–2026",
  },
  {
    label: "Inversión VC Total en Colombia",
    value: "USD 6102.2M",
    detail: "2021–2026",
  },
  {
    label: "Sector Líder en Medellín",
    value: "Proptech",
    detail: "USD 212.76M invertidos",
  },
  {
    label: "Sector Líder en Colombia",
    value: "Fintech",
    detail: "USD 2496.21M invertidos",
  },
  {
    label: "Ranking StartupBlinks de Medellín",
    value: "130th Globalmente",
    detail: "Medellín 2026",
    trend: "+15 posiciones",
  },
]

type FilterButtonProps = {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}

function FilterButton({
  active = false,
  children,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      className={`filter-button ${active ? "filter-button-active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function ChartHeader({ title, subtitle }: { title: string subtitle: string }) {
  return (
    <div className="chart-header">
      <div className="chart-title">{title}</div>
      <div className="chart-subtitle">{subtitle}</div>
    </div>
  )
}

function InvestmentChart() {
  const ticks = [2000, 1500, 1000, 500, 0]
  const plotTop = 32
  const plotHeight = 210
  const baseline = plotTop + plotHeight

  return (
    <div className="chart-card">
      <ChartHeader
        title="Inversión VC – Colombia"
        subtitle="Inversión VC total por año (USD millones)"
      />
      <svg
        aria-label="Inversión VC – Colombia"
        className="chart-svg"
        role="img"
        viewBox="0 0 640 300"
      >
        {ticks.map((tick) => {
          const y = plotTop + ((2000 - tick) / 2000) * plotHeight
          return (
            <g key={tick}>
              <line className="grid-line" x1="58" x2="620" y1={y} y2={y} />
              <text className="axis-label" x="48" y={y + 4}>
                ${tick}
              </text>
            </g>
          )
        })}
        {investmentData.map((item, index) => {
          const x = 78 + index * 88
          const height = (item.value / 2000) * plotHeight
          const y = baseline - height
          return (
            <g
              className="bar-group"
              key={item.year}
              role="graphics-symbol"
              tabIndex={0}
            >
              <text className="bar-change" x={x + 27} y={y - 9}>
                {item.change}
              </text>
              <rect
                className={`chart-bar ${
                  item.year === "2025" ? "chart-bar-highlight" : ""
                }`}
                height={height}
                width="54"
                x={x}
                y={y}
              />
              <text className="axis-year" x={x + 27} y="266">
                {item.year}
              </text>
              <g className="svg-tooltip">
                <rect height="30" rx="4" width="78" x={x - 12} y={y + 12} />
                <text x={x + 27} y={y + 32}>
                  {item.display}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function DealsChart() {
  const ticks = [260, 195, 130, 65, 0]
  const rightTicks = ["$12M", "$9M", "$6M", "$3M", "$0M"]
  const plotTop = 32
  const plotHeight = 210
  const baseline = plotTop + plotHeight
  const points = dealsData
    .map((item, index) => {
      const x = 78 + index * 88 + 27
      const y = baseline - (item.average / 12) * plotHeight
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="chart-card">
      <ChartHeader
        title="Número de Deals y Promedio por Ronda – Colombia"
        subtitle="Número de deals y promedio de inversión por ronda (USD M)"
      />
      <svg
        aria-label="Número de Deals y Promedio por Ronda – Colombia"
        className="chart-svg"
        role="img"
        viewBox="0 0 670 300"
      >
        {ticks.map((tick, index) => {
          const y = plotTop + (index / 4) * plotHeight
          return (
            <g key={tick}>
              <line className="grid-line" x1="58" x2="620" y1={y} y2={y} />
              <text className="axis-label" x="48" y={y + 4}>
                {tick}
              </text>
              <text className="axis-label axis-label-right" x="630" y={y + 4}>
                {rightTicks[index]}
              </text>
            </g>
          )
        })}
        {dealsData.map((item, index) => {
          const x = 78 + index * 88
          const height = (item.deals / 260) * plotHeight
          const y = baseline - height
          return (
            <g
              className="bar-group"
              key={item.year}
              role="graphics-symbol"
              tabIndex={0}
            >
              <text className="bar-change" x={x + 27} y={y - 9}>
                {item.change}
              </text>
              <rect
                className={`chart-bar ${
                  item.year === "2025" ? "chart-bar-highlight" : ""
                }`}
                height={height}
                width="54"
                x={x}
                y={y}
              />
              <text className="axis-year" x={x + 27} y="266">
                {item.year}
              </text>
              <g className="svg-tooltip svg-tooltip-wide">
                <rect height="46" rx="4" width="112" x={x - 29} y={y + 10} />
                <text x={x + 27} y={y + 28}>
                  {item.dealsDisplay}
                </text>
                <text x={x + 27} y={y + 44}>
                  {item.averageDisplay}
                </text>
              </g>
            </g>
          )
        })}
        <polyline className="average-line" points={points} />
        {dealsData.map((item, index) => (
          <circle
            className="average-point"
            cx={78 + index * 88 + 27}
            cy={baseline - (item.average / 12) * plotHeight}
            key={item.year}
            r="4"
          />
        ))}
      </svg>
    </div>
  )
}

function MacroLineChart({
  title,
  subtitle,
  valueKey,
  max,
  ticks,
  prefix = "",
  suffix = "",
}: {
  title: string
  subtitle: string
  valueKey: "intensity" | "perCapita"
  max: number
  ticks: string[]
  prefix?: string
  suffix?: string
}) {
  const plotTop = 24
  const plotHeight = 170
  const baseline = plotTop + plotHeight
  const points = macroData
    .map((item, index) => {
      const x = 88 + index * 112
      const y = baseline - (item[valueKey] / max) * plotHeight
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="chart-card macro-chart">
      <ChartHeader title={title} subtitle={subtitle} />
      <svg className="chart-svg" role="img" viewBox="0 0 640 250">
        {ticks.map((tick, index) => {
          const y = plotTop + (index / (ticks.length - 1)) * plotHeight
          return (
            <g key={tick}>
              <line className="grid-line" x1="58" x2="612" y1={y} y2={y} />
              <text className="axis-label" x="48" y={y + 4}>
                {tick}
              </text>
            </g>
          )
        })}
        <polyline className="macro-line" points={points} />
        {macroData.map((item, index) => {
          const x = 88 + index * 112
          const y = baseline - (item[valueKey] / max) * plotHeight
          const displayValue =
            valueKey === "intensity"
              ? item[valueKey].toFixed(2)
              : item[valueKey].toFixed(1)
          return (
            <g className="point-group" key={item.year} tabIndex={0}>
              <circle className="macro-point" cx={x} cy={y} r="5" />
              <text className="axis-year" x={x} y="220">
                {item.year}
              </text>
              <g className="svg-tooltip">
                <rect height="30" rx="4" width="88" x={x - 44} y={y - 42} />
                <text x={x} y={y - 22}>
                  ≈{prefix}
                  {displayValue}
                  {suffix}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Panorama() {
  return (
    <>
      <div className="indicators-grid">
        {indicators.map((indicator) => (
          <article className="indicator-card" key={indicator.label}>
            <div className="indicator-value">{indicator.value}</div>
            <div className="indicator-label">{indicator.label}</div>
            <div className="indicator-detail">{indicator.detail}</div>
            {indicator.trend && (
              <div className="indicator-trend">↗ {indicator.trend}</div>
            )}
          </article>
        ))}
      </div>
      <div className="primary-charts">
        <InvestmentChart />
        <DealsChart />
      </div>
      <section className="macro-section">
        <div className="macro-section-title">
          Indicadores Macro de VC – Colombia
        </div>
        <div className="macro-grid">
          <MacroLineChart
            max={0.6}
            subtitle="Inversión VC como porcentaje del PIB"
            suffix="%"
            ticks={["0.60%", "0.45%", "0.30%", "0.15%", "0.00%"]}
            title="Intensidad de Inversión – Colombia"
            valueKey="intensity"
          />
          <MacroLineChart
            max={40}
            prefix="$"
            subtitle="USD invertidos por habitante"
            ticks={["$40.0", "$30.0", "$20.0", "$10.0", "$0.0"]}
            title="Inversión VC per Cápita (USD) – Colombia"
            valueKey="perCapita"
          />
        </div>
      </section>
    </>
  )
}

export default function App() {
  const initialTab = tabs.some(({ id }) => id === window.location.hash.slice(1))
    ? window.location.hash.slice(1)
    : tabs[0].id
  const [activeTab, setActiveTab] = useState(initialTab)
  const [location, setLocation] = useState<"Colombia" | "Medellín">("Colombia")
  const contentRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", `#${activeTab}`)
    }

    const syncFromHash = () => {
      const hash = window.location.hash.slice(1)
      if (tabs.some(({ id }) => id === hash)) {
        setActiveTab(hash)
      }
    }

    window.addEventListener("hashchange", syncFromHash)
    window.addEventListener("popstate", syncFromHash)
    return () => {
      window.removeEventListener("hashchange", syncFromHash)
      window.removeEventListener("popstate", syncFromHash)
    }
  }, [activeTab])

  const selectTab = (id: string, shouldFocus = false) => {
    setActiveTab(id)
    window.history.pushState(null, "", `#${id}`)
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

    if (shouldFocus) {
      const index = tabs.findIndex((tab) => tab.id === id)
      tabRefs.current[index]?.focus()
    }
  }

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const direction = event.key === "ArrowRight" ? 1 : -1
    const nextIndex = (index + direction + tabs.length) % tabs.length
    selectTab(tabs[nextIndex].id, true)
  }

  const currentTab = tabs.find(({ id }) => id === activeTab) ?? tabs[0]

  return (
    <div className="app-shell">
      <header className="brand-header">
        <div className="watermark" aria-hidden="true">
          ⁿ
        </div>
        <div className="header-utility">
          <button className="language-button" type="button">
            Español
          </button>
        </div>
        <div className="header-content">
          <div className="logo-row">
            <div
              aria-label="Ruta N Medellín – Centro de Innovación y Negocios"
              className="logo-slot"
            />
            <span className="logo-divider" aria-hidden="true" />
            <div
              aria-label="Sello VC — Medellín Venture Capital"
              className="logo-slot logo-slot-wide"
            />
          </div>
          <div className="title-block">
            <div className="main-title">Inversómetro</div>
            <div className="subtitle">Medellín Venture Capital</div>
          </div>
          <div className="years-block" aria-label="Años">
            2021 – 2026
          </div>
        </div>
      </header>

      <div className="sticky-navigation">
        <section className="filters" aria-label="Filtros">
          <div className="filter-group">
            <FilterButton active>Filtrar por año: Todos</FilterButton>
            <FilterButton active>Tipo de inversión: Todos</FilterButton>
          </div>
          <div className="filter-group location-filter">
            <FilterButton
              active={location === "Colombia"}
              onClick={() => setLocation("Colombia")}
            >
              Colombia
            </FilterButton>
            <FilterButton
              active={location === "Medellín"}
              onClick={() => setLocation("Medellín")}
            >
              Medellín
            </FilterButton>
          </div>
        </section>

        <nav className="tabs" aria-label="Secciones">
          <div className="tabs-scroll" role="tablist">
            {tabs.map((tab, index) => (
              <button
                aria-controls="tab-content"
                aria-selected={tab.id === activeTab}
                className={`tab-button ${
                  tab.id === activeTab ? "tab-button-active" : ""
                }`}
                id={`tab-${tab.id}`}
                key={tab.id}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                role="tab"
                tabIndex={tab.id === activeTab ? 0 : -1}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <main
        aria-labelledby={`tab-${activeTab}`}
        className="tab-content"
        id="tab-content"
        ref={contentRef}
        role="tabpanel"
        tabIndex={-1}
      >
        {activeTab === "panorama" ? (
          <Panorama />
        ) : (
          <>
            <div className="content-heading">
              <div className="section-title">{currentTab.label}</div>
            </div>
            <div className="dashboard-grid" aria-hidden="true">
              <div className="dashboard-card dashboard-card-wide" />
              <div className="dashboard-card" />
              <div className="dashboard-card" />
              <div className="dashboard-card dashboard-card-wide" />
            </div>
          </>
        )}
      </main>

      <section className="previous-section">
        <div>
          <div className="footer-section-label">Inversómetros Anteriores</div>
          <div className="previous-description">
            Explora ediciones anteriores del Inversómetro y accede a los
            informes históricos sobre la actividad de inversión en Medellín y
            Colombia.
          </div>
        </div>
        <div className="previous-rule" aria-hidden="true" />
      </section>

      <section className="closing-band">
        <div className="closing-heading">
          <div className="closing-eyebrow">
            Herramienta de Inteligencia del Ecosistema VC de Medellín por Ruta N
          </div>
          <div className="closing-title">Inversómetro</div>
        </div>
        <div className="closing-stats">
          <div>
            <strong>USD 6102.2M</strong>
            <span>Capital VC en Colombia</span>
          </div>
          <div>
            <strong>750+</strong>
            <span>Instituciones que invierten en Colombia</span>
          </div>
          <div>
            <strong>25</strong>
            <span>Corporativos con historial VC</span>
          </div>
          <div>
            <strong>10</strong>
            <span>Family Offices en transición generacional</span>
          </div>
        </div>
        <div className="closing-phrase">
          La oportunidad es ahora. El mayor riesgo es no actuar.
        </div>
      </section>

      <footer className="footer">
        Inversómetro · Fuente de datos: LAVCA · Construido por Ruta N · Centro
        de Innovación y Negocios de Medellín
      </footer>
    </div>
  )
}
