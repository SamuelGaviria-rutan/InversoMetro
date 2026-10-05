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

const sectorData = [
  {
    name: "Fintech",
    value: "USD 2496.21M (40.9%)",
    width: "100%",
    highlight: true,
  },
  { name: "Proptech", value: "USD 990.9M (16.2%)", width: "39.7%" },
  { name: "Otros", value: "USD 837.91M (13.7%)", width: "33.6%" },
  { name: "E-commerce", value: "USD 707.38M (11.6%)", width: "28.4%" },
  { name: "Superapp", value: "USD 626.8M (10.3%)", width: "25.1%" },
  { name: "sector.others", value: "USD 442.95M (7.3%)", width: "17.7%" },
]

const medellinStageData = [
  { name: "Pre-seed", value: "38 deals (24%)", width: "51.4%" },
  {
    name: "Seed",
    value: "74 deals (46%)",
    width: "100%",
    highlight: true,
  },
  { name: "Early-Stage", value: "26 deals (16%)", width: "35.1%" },
  { name: "Series A", value: "8 deals (5%)", width: "10.8%" },
  { name: "Late-Stage", value: "1 deals (1%)", width: "1.4%" },
  { name: "Series B+", value: "6 deals (4%)", width: "8.1%" },
  { name: "Unknown", value: "8 deals (5%)", width: "10.8%" },
]

const colombiaStageData = [
  { name: "Pre-seed", value: "188 deals (22%)", width: "49.6%" },
  {
    name: "Seed",
    value: "379 deals (45%)",
    width: "100%",
    highlight: true,
  },
  { name: "Early-Stage", value: "149 deals (18%)", width: "39.3%" },
  { name: "Series A", value: "37 deals (4%)", width: "9.8%" },
  { name: "Late-Stage", value: "23 deals (3%)", width: "6.1%" },
  { name: "Series B+", value: "28 deals (3%)", width: "7.4%" },
  { name: "Unknown", value: "40 deals (5%)", width: "10.6%" },
]

const fundingCurveData = [
  { year: "2021", medellin: 192, bogota: 1477 },
  { year: "2022", medellin: 98, bogota: 1711 },
  { year: "2023", medellin: 145, bogota: 623 },
  { year: "2024", medellin: 33, bogota: 633 },
  { year: "2025", medellin: 98, bogota: 727 },
  { year: "2026", medellin: 42, bogota: 89 },
]

const comparisonDealsData = [
  { year: "2021", medellin: 46, bogota: 131 },
  { year: "2022", medellin: 38, bogota: 194 },
  { year: "2023", medellin: 31, bogota: 111 },
  { year: "2024", medellin: 18, bogota: 84 },
  { year: "2025", medellin: 19, bogota: 72 },
  { year: "2026", medellin: 3, bogota: 8 },
]

const averageTicketData = [
  { year: "2021", medellin: 5.7, bogota: 14.2 },
  { year: "2022", medellin: 3.4, bogota: 12.5 },
  { year: "2023", medellin: 7.1, bogota: 8.2 },
  { year: "2024", medellin: 3.2, bogota: 11.1 },
  { year: "2025", medellin: 8.4, bogota: 15.2 },
  { year: "2026", medellin: 15.1, bogota: 19.1 },
]

const capitalOriginData = [
  { code: "US", country: "USA", value: 762, width: "100%", highlight: true },
  { code: "CO", country: "Colombia", value: 303, width: "39.8%" },
  { code: "MX", country: "Mexico", value: 140, width: "18.4%" },
  { code: "BR", country: "Brazil", value: 95, width: "12.5%" },
  { code: "AR", country: "Argentina", value: 64, width: "8.4%" },
  { code: "CL", country: "Chile", value: 51, width: "6.7%" },
  { code: "ES", country: "Spain", value: 41, width: "5.4%" },
  { code: "GB", country: "UK", value: 37, width: "4.9%" },
  { code: "NL", country: "Netherlands", value: 34, width: "4.5%" },
  { code: "PE", country: "Peru", value: 33, width: "4.3%" },
  { code: "DE", country: "Germany", value: 30, width: "3.9%" },
  { code: "SG", country: "Singapore", value: 27, width: "3.5%" },
  { code: "CH", country: "Switzerland", value: 22, width: "2.9%" },
  { code: "JP", country: "Japan", value: 16, width: "2.1%" },
  { code: "PA", country: "Panama", value: 12, width: "1.6%" },
]

const americasInvestorData = [
  { code: "US", country: "USA", value: 333, width: "100%", highlight: true },
  { code: "CO", country: "Colombia", value: 117, width: "35.1%" },
  { code: "MX", country: "Mexico", value: 48, width: "14.4%" },
  { code: "BR", country: "Brazil", value: 27, width: "8.1%" },
  { code: "CL", country: "Chile", value: 19, width: "5.7%" },
  { code: "AR", country: "Argentina", value: 17, width: "5.1%" },
  { code: "CA", country: "Canada", value: 8, width: "2.4%" },
  { code: "PE", country: "Peru", value: 7, width: "2.1%" },
]

const globalInvestorData = [
  { code: "GB", country: "UK", value: 29, width: "100%", highlight: true },
  { code: "ES", country: "Spain", value: 22, width: "75.9%" },
  { code: "CH", country: "Switzerland", value: 16, width: "55.2%" },
  { code: "DE", country: "Germany", value: 15, width: "51.7%" },
  { code: "SG", country: "Singapore", value: 12, width: "41.4%" },
  { code: "NL", country: "Netherlands", value: 6, width: "20.7%" },
  { code: "IN", country: "India", value: 5, width: "17.2%" },
  { code: "AU", country: "Australia", value: 5, width: "17.2%" },
  { code: "LU", country: "Luxembourg", value: 5, width: "17.2%" },
  { code: "JP", country: "Japan", value: 5, width: "17.2%" },
  { code: "IT", country: "Italy", value: 4, width: "13.8%" },
  { code: "AE", country: "UAE", value: 4, width: "13.8%" },
]

const institutionsData = [
  { investor: "Y Combinator", country: "USA", type: "Accelerator", investments: 37 },
  { investor: "Cube Ventures", country: "Colombia", type: "Accelerator", investments: 24 },
  { investor: "Rockstart", country: "Netherlands", type: "Accelerator", investments: 24 },
  { investor: "500 Global", country: "USA", type: "VC Fund", investments: 18 },
  { investor: "Techstars Ventures", country: "USA", type: "Accelerator", investments: 10 },
  { investor: "Tiger Global Management", country: "USA", type: "VC Fund", investments: 8 },
  { investor: "INCA Ventures", country: "Peru", type: "VC Fund", investments: 6 },
  { investor: "Wollef Ventures", country: "Mexico", type: "VC Fund", investments: 6 },
  { investor: "Endeavor Catalyst", country: "USA", type: "Accelerator", investments: 6 },
  { investor: "monashees", country: "Brazil", type: "VC Fund", investments: 6 },
  { investor: "Simma Capital", country: "Colombia", type: "VC Fund", investments: 6 },
  { investor: "Platanus Ventures", country: "Chile", type: "Accelerator", investments: 5 },
  { investor: "Marathon Ventures", country: "Colombia", type: "VC Fund", investments: 5 },
  { investor: "New Ventures", country: "Mexico", type: "VC Fund", investments: 5 },
  { investor: "Orbit Ventures", country: "Singapore", type: "Accelerator", investments: 5 },
  { investor: "Latin Leap", country: "Colombia", type: "VC Fund", investments: 4 },
  { investor: "Parallel18", country: "Puerto Rico", type: "Accelerator", investments: 4 },
  { investor: "Crestone Venture Capital", country: "USA", type: "VC Fund", investments: 4 },
  { investor: "Comfama", country: "Colombia", type: "Corporate VC", investments: 3 },
  { investor: "Decelera Ventures", country: "Spain", type: "Accelerator", investments: 2 },
  { investor: "Fen Ventures", country: "Chile", type: "VC Fund", investments: 2 },
  { investor: "Funders VC", country: "USA", type: "VC Fund", investments: 1 },
  { investor: "Banco Itaú", country: "Brazil", type: "Corporate VC", investments: 1 },
]

const colombianInvestorTypes = [
  {
    title: "VC Funds",
    names:
      "Actions Capital, ALIVE Ventures, Amberes Ventures, ANDEO Capital, Andes Angels, ANDI del Futuro, Arrebol Capital, Asiri, Athenea Impacto, Carmenta Labs, El Hub Ventures, Ewa Capital, Flink, Fondo Impacta, Impulsum Ventures, InQlab, Inversor, IRIE Investments, Iwana Ventures, JEC Capital Group, Koyamaki Ventures, Latin Leap, LinkU Ventures, Marathon Ventures, MatterScale Ventures, Meridian75, Nevado Capital, New Ventures Capital, Oglit, Opera Ventures, Polux, Polymath Ventures, Simma Capital, Taurus Capital, Tique Capital, Tislion VC, Trinity Capital Ventures, Tvalley, Valuaty, Vertical Partners, Zetta Ventures".split(
        ", ",
      ),
  },
  {
    title: "Corporate VC",
    names:
      "Albora, Andean Fields International, Auteco, Bavaria, BBVA Spark, BIOS Ventures, Comfama, Dysatex, Ecopetrol, Grupo Alpina, Grupo Argos, Grupo Bancolombia, Grupo Bolívar, Grupo Energía Bogotá, Grupo Sura, GZFB, Inndigo Ventures, Metro de Medellín, Organización Corona, Penagos, Pérgamo Ventures (Alquería), Satrack Ventures, Skandia, Tu Boleta, Ventures EPM".split(
        ", ",
      ),
  },
  {
    title: "Accelerators",
    names:
      "Agcenter, Azule, Bictia, Biointropic, CleantechHUB, Comfenalco Antioquia, Connect Bogota, Corpoemprende, Creame, Cube Ventures, Digital Ventures, Distilled Innovation, Endeavor Colombia, Escala, Estratek, Fosters Advance, HubBOG, Impact Hub Medellín, Máximo impacto, Ongoing EAFIT, Pantera Makers, Parque E, Pygma, Rockstart, Ruta N, Salamandra Ventures, Sinergia, StarterCo, Startups Academy, Valo Estratégico, VENA".split(
        ", ",
      ),
  },
  {
    title: "Fund of Funds",
    names: ["Bancóldex", "Veronorte"],
  },
]

const corporateVentureData = [
  { corporate: "Grupo Bancolombia", city: "Medellín", industry: "Banking", deals: 12, ticket: "USD $500k–$1M", focus: "Fintech, Proptech" },
  { corporate: "SoftBank Group", city: "Japan", industry: "Technology", deals: 10, ticket: "N/A", focus: "Late-stage, Super Apps" },
  { corporate: "Comfama", city: "Medellín", industry: "Social Services", deals: 7, ticket: "USD $1M–$3M", focus: "Social Impact, Fintech" },
  { corporate: "BBVA Spark", city: "Bogotá", industry: "Financial Services", deals: 6, ticket: "USD $2M–$5M", focus: "Fintech, SaaS" },
  { corporate: "Globant", city: "Argentina", industry: "Technology", deals: 5, ticket: "N/A", focus: "SaaS, AI" },
  { corporate: "Mercado Libre", city: "Argentina", industry: "E-commerce", deals: 5, ticket: "N/A", focus: "Fintech, Logtech" },
  { corporate: "EPM Ventures", city: "Medellín", industry: "Energy & Utilities", deals: 4, ticket: "USD $10M–$30M", focus: "Cleantech, Renewable Energy" },
  { corporate: "FEMSA Ventures", city: "Mexico", industry: "Beverages & Retail", deals: 4, ticket: "N/A", focus: "Foodtech, E-commerce" },
  { corporate: "Grupo Sura", city: "Medellín", industry: "Financial Conglomerate", deals: 2, ticket: "USD $500k–$1M", focus: "Fintech, Healthtech" },
  { corporate: "Grupo Bolívar", city: "Bogotá", industry: "Financial Services", deals: 2, ticket: "USD $2M", focus: "Fintech, Inclusion" },
  { corporate: "Inndigo Ventures (ISA)", city: "Medellín", industry: "Energy", deals: 2, ticket: "USD $1M–$3M", focus: "Cleantech, Grid Tech" },
  { corporate: "Skandia", city: "Bogotá", industry: "Insurance & Pensions", deals: 2, ticket: "USD $1M–$2M", focus: "Fintech, Insurtech" },
  { corporate: "Auteco Mobility", city: "Medellín", industry: "Automotive", deals: 2, ticket: "USD $250k–$500k", focus: "Mobility Tech" },
  { corporate: "Rappi", city: "Bogotá", industry: "Super App", deals: 2, ticket: "N/A", focus: "E-commerce, Logtech" },
  { corporate: "Metro de Medellín", city: "Medellín", industry: "Transportation", deals: 1, ticket: "USD $1M–$5M", focus: "Mobility, Urban Tech" },
  { corporate: "Grupo Argos", city: "Medellín", industry: "Infrastructure", deals: 1, ticket: "USD $500k–$1M", focus: "Proptech, Construction" },
  { corporate: "Ecopetrol", city: "Bogotá", industry: "Energy", deals: 1, ticket: "USD $5M–$10M", focus: "Cleantech, Energy" },
  { corporate: "Grupo Energía Bogotá", city: "Bogotá", industry: "Energy", deals: 1, ticket: "USD $5M–$10M", focus: "Cleantech, Utilities" },
  { corporate: "Protección", city: "Medellín", industry: "Pensions & Insurance", deals: 1, ticket: "USD $1M–$2M", focus: "Insurtech, Wealthtech" },
  { corporate: "BIOS Ventures", city: "Medellín", industry: "Technology", deals: 1, ticket: "USD $100k–$250k", focus: "SaaS, Data" },
  { corporate: "Satrack Ventures", city: "Medellín", industry: "Telematics", deals: 1, ticket: "USD $100k–$250k", focus: "Logtech, IoT" },
  { corporate: "Organización Corona", city: "Medellín", industry: "Manufacturing", deals: 1, ticket: "USD $500k–$2M", focus: "Proptech, Construction" },
  { corporate: "Tu Boleta", city: "Bogotá", industry: "Entertainment", deals: 1, ticket: "USD $250k–$500k", focus: "Events Tech" },
]

const exitData = [
  { company: "Mi Paquete", type: "Acquisition", description: "Acquired by ClickOh. E-commerce logistics.", year: "2025", amount: "Undisclosed" },
  { company: "Epayco", type: "Acquisition", description: "Acquired by Davivienda. E-commerce payment and logistics solutions.", year: "2024", amount: "Undisclosed" },
  { company: "Andro", type: "Full Acquisition", description: "100% acquisition by Infinity Capital (Dubai). Fintech-Blockchain.", year: "2024", amount: "USD 2M" },
  { company: "Ceiba", type: "Acquisition", description: "Acquired by VASS (Spanish consulting firm). Software and Data SaaS.", year: "2024", amount: "Undisclosed" },
  { company: "iGerencia", type: "Acquisition", description: "100% acquisition by Nimble Gravity (Denver). Data analytics company.", year: "2024", amount: "Undisclosed" },
  { company: "FinZi", type: "Acquisition", description: "Acquired by Girasol Payment Solutions. Personal finance fintech.", year: "2024", amount: "Undisclosed" },
  { company: "Oiga Technologies", type: "Acquisition", description: "Acquired by 10Pearls. AI-powered software company.", year: "2023", amount: "Undisclosed" },
  { company: "TODO1 Services (iuvity)", type: "Acquisition", description: "Acquired by Aquila. Fintech financial services.", year: "2023", amount: "Undisclosed" },
  { company: "PirPos", type: "Acquisition", description: "Acquired by Loggro. Restaurant POS and digital transformation.", year: "2022", amount: "Undisclosed" },
  { company: "Intergrupo", type: "Acquisition", description: "Acquired by SoftwareOne (Switzerland). Cloud services company.", year: "2021", amount: "USD 38M" },
  { company: "WorkUniversity", type: "Acquisition (Stock-swap)", description: "100% acquisition by Lumni (multinational edu-finance firm).", year: "2021", amount: "USD 25M" },
  { company: "Vlipco", type: "Majority Stake", description: "Bancolombia acquired 52.3% stake. Enterprise technology.", year: "2021", amount: "USD 5M" },
  { company: "Libera", type: "Acquisition", description: "Acquired by Finaktiva. Supply chain fintech specializing in factoring.", year: "2021", amount: "Undisclosed" },
  { company: "PSL", type: "Acquisition", description: "Acquired by Perficient. Enterprise software company.", year: "2020", amount: "USD 70M" },
]

const startupData = [
  { startup: "ADDI", city: "Bogotá", raised: "USD 846M", year: "2026" },
  { startup: "Habi", city: "Bogotá", raised: "USD 682.3M", year: "2024" },
  { startup: "Rappi", city: "Bogotá", raised: "USD 626.8M", year: "2025" },
  { startup: "Tül", city: "Bogotá", raised: "USD 382M", year: "2022" },
  { startup: "Frubana", city: "Bogotá", raised: "USD 220M", year: "2024" },
  { startup: "La Haus", city: "Medellín", raised: "USD 197M", year: "2023" },
  { startup: "Bayport Colombia", city: "Bogotá", raised: "USD 154M", year: "2024" },
  { startup: "BOLD", city: "Bogotá", raised: "USD 150M", year: "2025" },
  { startup: "Finkargo", city: "Bogotá", raised: "USD 122.5M", year: "2024" },
  { startup: "Welli", city: "Bogotá", raised: "USD 120.3M", year: "2025" },
  { startup: "Simetrik", city: "Bogotá", raised: "USD 114M", year: "2025" },
  { startup: "Omni Latam", city: "Bogotá", raised: "USD 100M", year: "2022" },
  { startup: "Credivalores", city: "Bogotá", raised: "USD 100M", year: "2022" },
  { startup: "Avista", city: "Bogotá", raised: "USD 88.5M", year: "2025" },
  { startup: "Foodology", city: "Bogotá", raised: "USD 82M", year: "2023" },
  { startup: "Finkagro", city: "Bogotá", raised: "USD 75M", year: "2022" },
  { startup: "Merqueo", city: "Bogotá", raised: "USD 72M", year: "2022" },
  { startup: "RobinFood", city: "Bogotá", raised: "USD 71.27M", year: "2024" },
  { startup: "Cobre", city: "Bogotá", raised: "USD 65M", year: "2024" },
  { startup: "Treinta", city: "Bogotá", raised: "USD 63.92M", year: "2022" },
  { startup: "Kala", city: "Bogotá", raised: "USD 61M", year: "2025" },
  { startup: "Platzi", city: "Bogotá", raised: "USD 60M", year: "2021" },
  { startup: "Laika", city: "Bogotá", raised: "USD 60M", year: "2023" },
  { startup: "The Green Coffee Company", city: "Medellín", raised: "USD 58.73M", year: "2026" },
  { startup: "FinMaq", city: "Bogotá", raised: "USD 53.5M", year: "2025" },
  { startup: "Chiper", city: "Bogotá", raised: "USD 53M", year: "2021" },
  { startup: "Muncher", city: "Bogotá", raised: "USD 49.42M", year: "2022" },
  { startup: "Finaktiva", city: "Medellín", raised: "USD 43M", year: "2025" },
  { startup: "Solenium", city: "Medellín", raised: "USD 40M", year: "2025" },
  { startup: "Castia", city: "Bogotá", raised: "USD 38.78M", year: "2022" },
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

function SectorsAndStages() {
  return (
    <>
      <div className="chart-card sector-chart-card">
        <ChartHeader
          title="Distribución Sectorial – Colombia"
          subtitle="Hacia dónde fluye el capital (USD M)"
        />
        <div
          aria-label="Distribución Sectorial – Colombia"
          className="horizontal-chart"
          role="img"
        >
          {sectorData.map((sector) => (
            <div className="horizontal-chart-row" key={sector.name}>
              <div className="horizontal-chart-name">{sector.name}</div>
              <div className="horizontal-chart-track">
                <div
                  className={`horizontal-chart-bar ${
                    sector.highlight ? "horizontal-chart-bar-highlight" : ""
                  }`}
                  style={
                    {
                      "--bar-width": sector.width,
                    } as React.CSSProperties
                  }
                />
              </div>
              <div className="horizontal-chart-value">{sector.value}</div>
            </div>
          ))}
        </div>
        <div className="sector-insight">
          <strong>Insight:</strong> Software es el sector más activo por número
          de deals, pero Proptech lidera en monto total por deals de gran escala
          (e.g., La Haus con USD 197M+ en varias rondas).
        </div>
      </div>

      <div className="stage-cards-grid">
        <StageChart
          data={medellinStageData}
          insight={
            <>
              Medellín es actualmente una &quot;Máquina de Seed.&quot; El
              ecosistema necesita más fondos Serie A/B para evitar que las
              startups abandonen la ciudad al escalar.
            </>
          }
          subtitle="Inversión por etapa (por número de deals)"
          title="Medellín – Inversión por Etapa"
        />
        <StageChart
          data={colombiaStageData}
          insight={
            <>
              Las etapas tardías y deuda venture dominan por monto, impulsadas
              por mega-rondas de Rappi, ADDI y Habi. La actividad seed sigue
              siendo el pilar del deal flow.
            </>
          }
          subtitle="Inversión por etapa (por número de deals)"
          title="Colombia – Inversión por Etapa"
        />
      </div>
    </>
  )
}

function StageChart({
  data,
  insight,
  subtitle,
  title,
}: {
  data: Array<{
    name: string
    value: string
    width: string
    highlight?: boolean
  }>
  insight: React.ReactNode
  subtitle: string
  title: string
}) {
  return (
    <div className="chart-card stage-chart-card">
      <ChartHeader title={title} subtitle={subtitle} />
      <div aria-label={title} className="stage-chart" role="img">
        {data.map((stage) => (
          <div className="stage-chart-row" key={stage.name}>
            <div className="stage-chart-labels">
              <span>{stage.name}</span>
              <span>{stage.value}</span>
            </div>
            <div className="horizontal-chart-track">
              <div
                className={`horizontal-chart-bar ${
                  stage.highlight ? "horizontal-chart-bar-highlight" : ""
                }`}
                style={
                  {
                    "--bar-width": stage.width,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className="sector-insight">
        <strong>Insight:</strong> {insight}
      </div>
    </div>
  )
}

function MedellinVsBogota() {
  const ticks = [1800, 1350, 900, 450, 0]
  const plotTop = 44
  const plotHeight = 240
  const baseline = plotTop + plotHeight

  return (
    <>
      <div className="comparison-insights">
        <article className="comparison-insight-card">
          Bogotá concentra 5.6x más capital que Medellín. La brecha no es de
          talento, es de densidad de capital.
        </article>
        <article className="comparison-insight-card">
          Medellín tiene una brecha de madurez en Series A/B, con la mayoría de
          deals en etapa seed.
        </article>
        <article className="comparison-insight-card">
          El ecosistema de Bogotá se beneficia de mayor densidad institucional y
          presencia de fondos globales.
        </article>
      </div>

      <div className="chart-card funding-curve-card">
        <div className="chart-header comparison-chart-header">
          <div className="chart-title">Curva de Financiamiento (USD M)</div>
          <div className="comparison-legend" aria-label="Leyenda">
            <span>
              <i className="legend-swatch legend-swatch-medellin" />
              Medellín
            </span>
            <span>
              <i className="legend-swatch legend-swatch-bogota" />
              Bogotá
            </span>
          </div>
        </div>
        <div className="comparison-chart-scroll">
          <svg
            aria-label="Curva de Financiamiento (USD M)"
            className="chart-svg comparison-chart-svg"
            role="img"
            viewBox="0 0 900 340"
          >
            {ticks.map((tick) => {
              const y = plotTop + ((1800 - tick) / 1800) * plotHeight
              return (
                <g key={tick}>
                  <line
                    className="grid-line"
                    x1="66"
                    x2="870"
                    y1={y}
                    y2={y}
                  />
                  <text className="axis-label" x="56" y={y + 4}>
                    ${tick}
                  </text>
                </g>
              )
            })}
            {fundingCurveData.map((item, index) => {
              const groupX = 104 + index * 128
              const medellinHeight = (item.medellin / 1800) * plotHeight
              const bogotaHeight = (item.bogota / 1800) * plotHeight
              const medellinY = baseline - medellinHeight
              const bogotaY = baseline - bogotaHeight

              return (
                <g key={item.year}>
                  <g className="bar-group" tabIndex={0}>
                    <rect
                      className="comparison-bar comparison-bar-medellin"
                      height={medellinHeight}
                      width="38"
                      x={groupX}
                      y={medellinY}
                    />
                    <g className="svg-tooltip">
                      <rect
                        height="30"
                        rx="4"
                        width="68"
                        x={groupX - 15}
                        y={medellinY - 38}
                      />
                      <text x={groupX + 19} y={medellinY - 18}>
                        ≈{item.medellin}
                      </text>
                    </g>
                  </g>
                  <g className="bar-group" tabIndex={0}>
                    <rect
                      className="comparison-bar comparison-bar-bogota"
                      height={bogotaHeight}
                      width="38"
                      x={groupX + 44}
                      y={bogotaY}
                    />
                    <g className="svg-tooltip">
                      <rect
                        height="30"
                        rx="4"
                        width="76"
                        x={groupX + 25}
                        y={bogotaY - 38}
                      />
                      <text x={groupX + 63} y={bogotaY - 18}>
                        ≈{item.bogota}
                      </text>
                    </g>
                  </g>
                  <text className="axis-year" x={groupX + 41} y="310">
                    {item.year}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="comparison-secondary-grid">
        <DealsComparisonChart />
        <AverageTicketChart />
      </div>
    </>
  )
}

function DealsComparisonChart() {
  const ticks = [200, 150, 100, 50, 0]
  const plotTop = 36
  const plotHeight = 200
  const baseline = plotTop + plotHeight

  return (
    <div className="chart-card comparison-secondary-card">
      <div className="chart-header comparison-secondary-header">
        <div className="chart-title">Número de Deals</div>
        <div className="comparison-legend" aria-label="Leyenda">
          <span>
            <i className="legend-swatch legend-swatch-medellin" />
            Medellín Deals
          </span>
          <span>
            <i className="legend-swatch legend-swatch-bogota" />
            Bogotá Deals
          </span>
        </div>
      </div>
      <svg
        aria-label="Número de Deals"
        className="chart-svg"
        role="img"
        viewBox="0 0 640 290"
      >
        {ticks.map((tick) => {
          const y = plotTop + ((200 - tick) / 200) * plotHeight
          return (
            <g key={tick}>
              <line className="grid-line" x1="48" x2="620" y1={y} y2={y} />
              <text className="axis-label" x="39" y={y + 4}>
                {tick}
              </text>
            </g>
          )
        })}
        {comparisonDealsData.map((item, index) => {
          const groupX = 68 + index * 91
          const medellinHeight = (item.medellin / 200) * plotHeight
          const bogotaHeight = (item.bogota / 200) * plotHeight
          const medellinY = baseline - medellinHeight
          const bogotaY = baseline - bogotaHeight

          return (
            <g key={item.year}>
              <g className="bar-group" tabIndex={0}>
                <rect
                  className="comparison-bar comparison-bar-medellin"
                  height={medellinHeight}
                  width="30"
                  x={groupX}
                  y={medellinY}
                />
                <g className="svg-tooltip">
                  <rect
                    height="30"
                    rx="4"
                    width="60"
                    x={groupX - 15}
                    y={medellinY - 37}
                  />
                  <text x={groupX + 15} y={medellinY - 17}>
                    ≈{item.medellin}
                  </text>
                </g>
              </g>
              <g className="bar-group" tabIndex={0}>
                <rect
                  className="comparison-bar comparison-bar-bogota"
                  height={bogotaHeight}
                  width="30"
                  x={groupX + 35}
                  y={bogotaY}
                />
                <g className="svg-tooltip">
                  <rect
                    height="30"
                    rx="4"
                    width="64"
                    x={groupX + 18}
                    y={bogotaY - 37}
                  />
                  <text x={groupX + 50} y={bogotaY - 17}>
                    ≈{item.bogota}
                  </text>
                </g>
              </g>
              <text className="axis-year" x={groupX + 32.5} y="263">
                {item.year}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function AverageTicketChart() {
  const ticks = [20, 15, 10, 5, 0]
  const plotTop = 36
  const plotHeight = 200
  const baseline = plotTop + plotHeight
  const medellinPoints = averageTicketData
    .map((item, index) => {
      const x = 78 + index * 102
      const y = baseline - (item.medellin / 20) * plotHeight
      return `${x},${y}`
    })
    .join(" ")
  const bogotaPoints = averageTicketData
    .map((item, index) => {
      const x = 78 + index * 102
      const y = baseline - (item.bogota / 20) * plotHeight
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="chart-card comparison-secondary-card">
      <div className="chart-header comparison-secondary-header">
        <div className="chart-title">Ticket Promedio (USD M)</div>
        <div className="comparison-legend" aria-label="Leyenda">
          <span>
            <i className="legend-swatch legend-swatch-medellin" />
            Medellín Avg
          </span>
          <span>
            <i className="legend-swatch legend-swatch-bogota" />
            Bogotá Avg
          </span>
        </div>
      </div>
      <svg
        aria-label="Ticket Promedio (USD M)"
        className="chart-svg"
        role="img"
        viewBox="0 0 640 290"
      >
        {ticks.map((tick) => {
          const y = plotTop + ((20 - tick) / 20) * plotHeight
          return (
            <g key={tick}>
              <line className="grid-line" x1="48" x2="620" y1={y} y2={y} />
              <text className="axis-label" x="39" y={y + 4}>
                ${tick}
              </text>
            </g>
          )
        })}
        <polyline
          className="comparison-line comparison-line-medellin"
          points={medellinPoints}
        />
        <polyline
          className="comparison-line comparison-line-bogota"
          points={bogotaPoints}
        />
        {averageTicketData.map((item, index) => {
          const x = 78 + index * 102
          const medellinY = baseline - (item.medellin / 20) * plotHeight
          const bogotaY = baseline - (item.bogota / 20) * plotHeight
          return (
            <g key={item.year}>
              <g className="point-group" tabIndex={0}>
                <circle
                  className="comparison-point comparison-point-medellin"
                  cx={x}
                  cy={medellinY}
                  r="5"
                />
                <g className="svg-tooltip">
                  <rect
                    height="30"
                    rx="4"
                    width="64"
                    x={x - 32}
                    y={medellinY - 40}
                  />
                  <text x={x} y={medellinY - 20}>
                    ≈{item.medellin}
                  </text>
                </g>
              </g>
              <g className="point-group" tabIndex={0}>
                <circle
                  className="comparison-point comparison-point-bogota"
                  cx={x}
                  cy={bogotaY}
                  r="5"
                />
                <g className="svg-tooltip">
                  <rect
                    height="30"
                    rx="4"
                    width="64"
                    x={x - 32}
                    y={bogotaY - 40}
                  />
                  <text x={x} y={bogotaY - 20}>
                    ≈{item.bogota}
                  </text>
                </g>
              </g>
              <text className="axis-year" x={x} y="263">
                {item.year}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Investors() {
  return (
    <>
      <div className="chart-card capital-origin-card">
        <ChartHeader
          title="Origen del Capital"
          subtitle="De dónde proviene la inversión (por # de inversiones)"
        />
        <div
          aria-label="Origen del Capital"
          className="capital-origin-grid"
          role="img"
        >
          {capitalOriginData.map((item) => (
            <div className="capital-origin-row" key={item.code}>
              <div className="capital-origin-country">
                <span>{item.code}</span>
                <strong>{item.country}</strong>
              </div>
              <div className="capital-origin-bar-area">
                <div className="capital-origin-track">
                  <div
                    className={`capital-origin-bar ${
                      item.highlight ? "capital-origin-bar-highlight" : ""
                    }`}
                    style={
                      {
                        "--bar-width": item.width,
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div className="capital-origin-value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="sector-insight">
          <strong>Insight:</strong> EE.UU. domina con fondos de Silicon Valley
          como Y Combinator y NFX liderando el deal flow. 2025 vio un aumento de
          capital diversificado desde Singapur y Europa (Países Bajos, España).
          El CVC local (Grupo Bancolombia) también juega un rol creciente.
        </div>
      </div>

      <div className="chart-card global-investors-card">
        <ChartHeader
          title="Mapa Global de Inversores"
          subtitle="Inversores que han invertido en startups colombianas (2021–2026)"
        />
        <div className="global-investor-stats">
          <div>
            <strong>117</strong>
            <span>Inversores Colombianos</span>
          </div>
          <div>
            <strong>482</strong>
            <span>Americas (sin Colombia)</span>
          </div>
          <div>
            <strong>161+</strong>
            <span>Resto del Mundo</span>
          </div>
        </div>
        <div className="global-investor-groups">
          <InvestorBarGroup data={americasInvestorData} title="Americas" />
          <InvestorBarGroup
            data={globalInvestorData}
            title="Europe, Asia & Others"
          />
        </div>
      </div>

      <InstitutionsTable />
      <ColombianInvestorsByType />
    </>
  )
}

function InvestorBarGroup({
  data,
  title,
}: {
  data: Array<{
    code: string
    country: string
    value: number
    width: string
    highlight?: boolean
  }>
  title: string
}) {
  return (
    <div className="global-investor-group">
      <div className="global-investor-group-title">{title}</div>
      <div className="global-investor-bars">
        {data.map((item) => (
          <div className="capital-origin-row" key={item.code}>
            <div className="capital-origin-country">
              <span>{item.code}</span>
              <strong>{item.country}</strong>
            </div>
            <div className="capital-origin-bar-area">
              <div className="capital-origin-track">
                <div
                  className={`capital-origin-bar ${
                    item.highlight ? "capital-origin-bar-highlight" : ""
                  }`}
                  style={
                    {
                      "--bar-width": item.width,
                    } as React.CSSProperties
                  }
                />
              </div>
              <div className="capital-origin-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InstitutionsTable() {
  const [expanded, setExpanded] = useState(false)
  const visibleInstitutions = expanded
    ? institutionsData
    : institutionsData.slice(0, 10)

  return (
    <div className="chart-card institutions-card">
      <ChartHeader
        title="Instituciones que Invierten en Colombia"
        subtitle="Top inversores por número de inversiones (2021–2026)"
      />
      <table className="institutions-table">
        <thead>
          <tr>
            <th>Inversor</th>
            <th>País</th>
            <th>Tipo</th>
            <th># Inversiones</th>
          </tr>
        </thead>
        <tbody>
          {visibleInstitutions.map((institution) => (
            <tr key={institution.investor}>
              <td data-label="Inversor">{institution.investor}</td>
              <td data-label="País">{institution.country}</td>
              <td data-label="Tipo">
                <span className="institution-type">{institution.type}</span>
              </td>
              <td data-label="# Inversiones">{institution.investments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!expanded && (
        <button
          className="show-all-button"
          onClick={() => setExpanded(true)}
          type="button"
        >
          Ver todas →
        </button>
      )}
    </div>
  )
}

function ColombianInvestorsByType() {
  return (
    <div className="chart-card investor-types-card">
      <ChartHeader
        title="Inversores Colombianos por Tipo"
        subtitle="Desglose del ecosistema de capital local"
      />
      <div className="investor-types-grid">
        {colombianInvestorTypes.map((group) => (
          <section className="investor-type-group" key={group.title}>
            <div className="investor-type-title">{group.title}</div>
            <ul className="investor-type-list">
              {group.names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

function InstitutionalCapital() {
  const [expanded, setExpanded] = useState(false)
  const visibleCorporates = expanded
    ? corporateVentureData
    : corporateVentureData.slice(0, 10)

  return (
    <>
      <div className="chart-card institutions-card">
        <ChartHeader
          title="Corporate Venture Capital"
          subtitle="corporativos con historial de inversión VC en Colombia"
        />
        <table className="institutions-table institutional-capital-table">
          <thead>
            <tr>
              <th>Corporativo</th>
              <th>Ciudad</th>
              <th>Industria</th>
              <th>Deals</th>
              <th>Ticket</th>
              <th>Enfoque Estratégico</th>
            </tr>
          </thead>
          <tbody>
            {visibleCorporates.map((corporate) => (
              <tr key={corporate.corporate}>
                <td data-label="Corporativo">{corporate.corporate}</td>
                <td data-label="Ciudad">{corporate.city}</td>
                <td data-label="Industria">
                  <span className="institution-type">
                    {corporate.industry}
                  </span>
                </td>
                <td data-label="Deals">{corporate.deals}</td>
                <td data-label="Ticket">{corporate.ticket}</td>
                <td data-label="Enfoque Estratégico">{corporate.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!expanded && (
          <button
            className="show-all-button"
            onClick={() => setExpanded(true)}
            type="button"
          >
            Ver todas →
          </button>
        )}
      </div>

      <FamilyOfficesCard />
      <MultilateralBankingCard />
      <MultiplierEffectCard />
    </>
  )
}

function FamilyOfficesCard() {
  return (
    <div className="chart-card family-offices-card">
      <div className="family-offices-header">
        <div className="chart-title">Family Offices en Colombia</div>
        <div className="family-offices-description">
          Ruta N ha identificado 10 Family Offices diferentes en Colombia, 4 de
          ellos en Bogotá y 6 en Medellín. Actualmente, identificamos familias
          con actividad en venture capital que no necesariamente invierten a
          través de su family office, sino mediante otros fondos de inversión
          que estructuran o como personas naturales.
        </div>
      </div>
      <div className="family-office-stats">
        <div className="family-office-stat">
          <span>Bogotá</span>
          <strong>4</strong>
          <small>Family Offices</small>
        </div>
        <div className="family-office-stat">
          <span>Medellín</span>
          <strong>6</strong>
          <small>Family Offices</small>
        </div>
      </div>
      <div className="barriers-box">
        <svg
          aria-hidden="true"
          className="barriers-icon"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M12 8v5M12 17h.01" />
          <path d="M10.3 3.8 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
        </svg>
        <div>
          <div className="barriers-title">Barreras para la Activación</div>
          <ul className="barriers-list">
            <li>Falta de vehículos institucionales con gobernanza clara</li>
            <li>Ausencia de señal pública que reduzca riesgo percibido</li>
            <li>
              Preferencia por inversiones en ciudades con mayor track record
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function MultilateralBankingCard() {
  const institutions = [
    {
      acronym: "CAF",
      name: "Banco de Desarrollo de América Latina y el Caribe",
      role: "Financiamiento VC regional",
    },
    {
      acronym: "BID",
      name: "Banco Interamericano de Desarrollo",
      role: "BID Lab & BID Invest",
    },
    {
      acronym: "Bancóldex",
      name: "Banco de desarrollo empresarial de Colombia",
      role: "Capital catalítico para innovación",
    },
  ]

  return (
    <div className="chart-card multilateral-card">
      <div className="multilateral-header">
        <div className="chart-title">
          Banca Multilateral e Institucionales como Catalizadores
        </div>
        <div className="family-offices-description">
          La banca multilateral y de desarrollo actúa como catalizador,
          amplificando la confianza y reduciendo el riesgo percibido.
        </div>
      </div>
      <div className="multilateral-grid">
        {institutions.map((institution) => (
          <article className="multilateral-institution" key={institution.acronym}>
            <strong>{institution.acronym}</strong>
            <span>{institution.name}</span>
            <small>{institution.role}</small>
          </article>
        ))}
      </div>
      <div className="sector-insight multilateral-insight">
        La participación de multilaterales no solo aporta capital, sino que
        envía una señal de validación al mercado que atrae inversionistas
        adicionales.
      </div>
    </div>
  )
}

function MultiplierEffectCard() {
  const metrics = [
    {
      figure: "1:10",
      title: "Capital Público → Privado",
      text: "Por cada USD 1 invertido desde lo público, se movilizan USD 10 de capital privado",
      icon: "exchange",
    },
    {
      figure: "450+",
      title: "Nuevas Empresas",
      text: "Startups apoyadas con el capital movilizado, 120+ con operación en Medellín",
      icon: "building",
    },
    {
      figure: "1,500+",
      title: "Empleos Directos",
      text: "Empleos directos en empresas tecnológicas habilitados por un Fondo de Ciudad",
      icon: "people",
    },
    {
      figure: "↑",
      title: "Retorno Fiscal",
      text: "Crecimiento del ecosistema genera retornos fiscales vía empleo formal e impuestos",
      icon: "trend",
    },
  ]

  return (
    <div className="chart-card multiplier-card">
      <div className="multilateral-header">
        <div className="chart-title">Efecto Multiplicador</div>
        <div className="family-offices-description">
          El rol del sector público no es financiar startups, sino habilitar
          confianza, atraer capital privado y banca multilateral.
        </div>
      </div>
      <div className="multiplier-scenarios">
        <article className="multiplier-scenario">
          <span>Escenario Conservador</span>
          <div>$1 Público → $10 Privado</div>
          <strong>1:10 Multiplicador</strong>
        </article>
        <article className="multiplier-scenario">
          <span>Caso México</span>
          <div>$1 Público → $50 Privado</div>
          <strong>1:50 Multiplicador</strong>
        </article>
      </div>
      <div className="multiplier-metrics">
        {metrics.map((metric) => (
          <article className="multiplier-metric" key={metric.title}>
            <MultiplierIcon kind={metric.icon} />
            <strong>{metric.figure}</strong>
            <span>{metric.title}</span>
            <p>{metric.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function MultiplierIcon({ kind }: { kind: string }) {
  return (
    <svg
      aria-hidden="true"
      className="multiplier-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      {kind === "exchange" && (
        <>
          <path d="M4 8h13M14 5l3 3-3 3" />
          <path d="M20 16H7M10 13l-3 3 3 3" />
        </>
      )}
      {kind === "building" && (
        <>
          <path d="M5 21V4h10v17M15 9h4v12M3 21h18" />
          <path d="M8 8h4M8 12h4M8 16h4" />
        </>
      )}
      {kind === "people" && (
        <>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="10" r="2" />
          <path d="M3 20v-2a5 5 0 0 1 10 0v2M14 16a4 4 0 0 1 7 3v1" />
        </>
      )}
      {kind === "trend" && (
        <>
          <path d="m4 17 6-6 4 4 6-8" />
          <path d="M15 7h5v5" />
        </>
      )}
    </svg>
  )
}

function StartupsAndExits() {
  return (
    <>
      <div className="chart-card exits-card">
        <ChartHeader
          title="Impacto y Liquidez: El Camino de las Salidas"
          subtitle="Exits clave y eventos de liquidez que prueban la madurez del ecosistema de Medellín"
        />
        <div className="exits-grid">
          {exitData.map((exit) => (
            <article className="exit-item" key={exit.company}>
              <div className="exit-heading">
                <strong>{exit.company}</strong>
                <span>{exit.type}</span>
              </div>
              <p>{exit.description}</p>
              <div className="exit-meta">
                <span>{exit.year}</span>
                <strong>{exit.amount}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>

      <StartupEcosystemTable />
    </>
  )
}

function StartupEcosystemTable() {
  const [expanded, setExpanded] = useState(false)
  const visibleStartups = expanded ? startupData : startupData.slice(0, 10)

  return (
    <div className="chart-card institutions-card startup-table-card">
      <ChartHeader
        title="Startups del Ecosistema – Colombia"
        subtitle="Startups que han levantado capital de riesgo en Colombia"
      />
      <table className="institutions-table startup-table">
        <thead>
          <tr>
            <th>Startup</th>
            <th>Ciudad</th>
            <th>Total Levantado</th>
            <th>Último Año</th>
          </tr>
        </thead>
        <tbody>
          {visibleStartups.map((startup) => (
            <tr key={startup.startup}>
              <td data-label="Startup">{startup.startup}</td>
              <td data-label="Ciudad">
                {startup.city === "Medellín" ? (
                  <span className="medellin-city">{startup.city}</span>
                ) : (
                  startup.city
                )}
              </td>
              <td data-label="Total Levantado">{startup.raised}</td>
              <td data-label="Último Año">{startup.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!expanded && (
        <button
          className="show-all-button"
          onClick={() => setExpanded(true)}
          type="button"
        >
          Ver todas →
        </button>
      )}
      <div className="startia-action">
        <button className="startia-button" type="button">
          Para más información visita Startia
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path d="M14 5h5v5M19 5l-9 9" />
            <path d="M19 13v6H5V5h6" />
          </svg>
        </button>
      </div>
    </div>
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
        ) : activeTab === "sectores-y-etapas" ? (
          <SectorsAndStages />
        ) : activeTab === "medellin-vs-bogota" ? (
          <MedellinVsBogota />
        ) : activeTab === "inversores" ? (
          <Investors />
        ) : activeTab === "capital-institucional" ? (
          <InstitutionalCapital />
        ) : activeTab === "startups-y-salidas" ? (
          <StartupsAndExits />
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
        <div className="previous-list">
          {[2014, 2015, 2016, 2017, 2018, 2019, 2020].map((year) => (
            <div className="previous-item" key={year}>
              <div>
                <div className="previous-item-title">Inversómetro {year}</div>
                <div className="previous-item-description">
                  Edición histórica del Inversómetro
                </div>
              </div>
              <div className="previous-actions">
                <button className="previous-link" type="button">
                  Ver informe
                </button>
                <button className="previous-link" type="button">
                  Descargar PDF
                </button>
              </div>
            </div>
          ))}
        </div>
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
