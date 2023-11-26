import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Jun',
    uv: 1890,
    pv: 4800,
    amt: 2181
  }
]

function SummaryChart() {
  return (
    <div className="p-6 bg-white">
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3A57E8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3A57E8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#85F4FA" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#85F4FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#3A57E8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#85F4FA"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SummaryChart
