import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export type PieDatum = { name: string; value: number };

type Props = {
  data: PieDatum[];
  colorByName: Record<string, string>;
  title?: string;
};

export default function StatusPieChart({ data, colorByName, title }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {title ? <h2 className="text-lg font-medium mb-4">{title}</h2> : null}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorByName[entry.name] || "#999"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
