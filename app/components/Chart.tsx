'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function Chart() {
  const data = [
    { day: 'Day 1', users: 12 },
    { day: 'Day 2', users: 18 },
    { day: 'Day 3', users: 3 },
    { day: 'Day 4', users: 5 },
    { day: 'Day 5', users: 4 },
    { day: 'Day 6', users: 3 },
    { day: 'Day 7', users: 7 },
  ]

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888888' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888888' }}
                  domain={[0, 20]}
                  ticks={[0, 4, 8, 12, 16, 20]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line
                  type="linear"
                  dataKey="users"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="Active Users"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: '#06b6d4',
                    stroke: '#fff',
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-cyan-500" />
            <span className="text-sm text-muted-foreground">Active Users</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}