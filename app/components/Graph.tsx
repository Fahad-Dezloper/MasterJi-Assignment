"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "January", sales: 65 },
  { month: "February", sales: 59 },
  { month: "March", sales: 80 },
  { month: "April", sales: 81 },
  { month: "May", sales: 56 },
  { month: "June", sales: 55 },
  { month: "July", sales: 40 },
]

export default function Graph() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold">Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 90]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-black p-2 text-white shadow-lg">
                        <p className="mb-1 font-semibold">{label}</p>
                        <p className="text-sm">Sales Performance: {payload[0].value}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="sales"
                fill="#d4b3ff"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-3 w-3 rounded bg-[#d4b3ff]" />
          <span className="ml-2 text-sm text-muted-foreground">Sales Performance</span>
        </div>
      </CardContent>
    </Card>
  )
}