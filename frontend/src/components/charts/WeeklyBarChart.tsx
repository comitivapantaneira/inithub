import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export type WeeklyDatum = { week: string; count: number };

type Props = {
  data: WeeklyDatum[];
  title?: string;
};

export default function WeeklyBarChart({ data, title }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {title ? <h2 className="text-lg font-medium mb-4">{title}</h2> : null}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
