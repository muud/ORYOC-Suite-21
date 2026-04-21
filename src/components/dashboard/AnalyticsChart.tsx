import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', occupancy: 65, revenue: 15400 },
  { name: 'Tue', occupancy: 72, revenue: 18200 },
  { name: 'Wed', occupancy: 85, revenue: 22100 },
  { name: 'Thu', occupancy: 81, revenue: 21500 },
  { name: 'Fri', occupancy: 96, revenue: 28900 },
  { name: 'Sat', occupancy: 98, revenue: 31000 },
  { name: 'Sun', occupancy: 88, revenue: 25400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'rgba(11, 15, 25, 0.9)' }}>
        <p style={{ margin: 0, fontWeight: 700, marginBottom: '0.5rem' }}>{label}</p>
        <p style={{ margin: 0, color: 'var(--accent-blue)', fontSize: '0.875rem' }}>
          Occupancy: {payload[0].value}%
        </p>
        <p style={{ margin: 0, color: 'var(--accent-emerald)', fontSize: '0.875rem' }}>
          Revenue: ${payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};

export const AnalyticsChart: React.FC = () => {
  return (
    <div className="cloud-motif-bg" style={{ width: '100%', height: '350px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-emerald)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--accent-emerald)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
          <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="occupancy" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorOcc)" />
          <Area type="monotone" dataKey="revenue" stroke="var(--accent-emerald)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
