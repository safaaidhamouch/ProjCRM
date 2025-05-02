"use client"

import type * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function Chart({ children, className, ...props }: React.ComponentProps<typeof ResponsiveContainer>) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className} {...props}>
      {children}
    </ResponsiveContainer>
  )
}

export function ChartPie({
  data,
  nameKey,
  dataKey,
  colors,
  className,
  ...props
}: {
  data: any[]
  nameKey: string
  dataKey: string
  colors?: string[]
  className?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <PieChart {...props}>
        <Pie
          data={data}
          nameKey={nameKey}
          dataKey={dataKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#7c3aed"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors ? colors[index % colors.length] : `hsl(${index * 45 + 260}, 70%, 60%)`}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function ChartBar({
  data,
  xKey,
  yKeys,
  colors,
  className,
  ...props
}: {
  data: any[]
  xKey: string
  yKeys: string[]
  colors?: string[]
  className?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <BarChart data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors ? colors[index % colors.length] : `hsl(${index * 45 + 260}, 70%, 60%)`}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ChartLine({
  data,
  xKey,
  yKeys,
  colors,
  className,
  ...props
}: {
  data: any[]
  xKey: string
  yKeys: string[]
  colors?: string[]
  className?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <LineChart data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors ? colors[index % colors.length] : `hsl(${index * 45 + 260}, 70%, 60%)`}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function ChartArea({
  data,
  xKey,
  yKeys,
  colors,
  className,
  ...props
}: {
  data: any[]
  xKey: string
  yKeys: string[]
  colors?: string[]
  className?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <AreaChart data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yKeys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            fill={colors ? colors[index % colors.length] : `hsl(${index * 45 + 260}, 70%, 40%)`}
            stroke={colors ? colors[index % colors.length] : `hsl(${index * 45 + 260}, 70%, 60%)`}
            fillOpacity={0.3}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export const ChartContainer = ({ children, className, ...props }: React.ComponentProps<typeof ResponsiveContainer>) => {
  return (
    <ResponsiveContainer width="100%" height={350} className={className} {...props}>
      {children}
    </ResponsiveContainer>
  )
}

export const ChartTooltip = () => {
  return null
}

export const ChartTooltipContent = () => {
  return null
}

export const ChartLegend = () => {
  return null
}

export const ChartLegendContent = () => {
  return null
}

export const ChartStyle = () => {
  return null
}
