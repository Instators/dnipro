// web/src/app/adapters/[id]/AdapterDetailClient.tsx
'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

interface Props {
  adapter: any;
  apyHistory: { date: string; apy: number }[];
}

export function AdapterDetailClient({ adapter, apyHistory }: Props) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="surface rounded-lg p-6">
        <h3 className="font-semibold mb-3">About {adapter.name}</h3>
        <p className="text-muted-foreground leading-relaxed">{adapter.description}</p>
      </div>

      {/* APY history chart */}
      <div className="surface rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">APY History (30d)</h3>
          <span className="text-sm text-green-400">{adapter.apyPercent} current</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={apyHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#666' }} tickLine={false} axisLine={false} interval={6} />
            <YAxis tick={{ fontSize: 11, fill: '#666' }} tickLine={false} axisLine={false} tickFormatter={v => `${v.toFixed(1)}%`} />
            <Tooltip
              contentStyle={{ background: '#0f2a26', border: '1px solid #1a3d39', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [`${v.toFixed(2)}%`, 'APY']}
            />
            <Line type="monotone" dataKey="apy" stroke="#7dd6c4" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
