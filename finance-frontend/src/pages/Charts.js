import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const Charts = () => {
  const [charts, setCharts] = useState([]);

  const fetchCharts = async () => {
    const res = await api.get('/charts');
    setCharts(res.data);
  };

  useEffect(() => {
    fetchCharts();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div>
      <h2>Charts</h2>
      {charts.map((chart) => {
        const chartData = Object.entries(chart.data).map(([key, value]) => ({
          name: key,
          value: Number(value)
        }));

        return (
          <div key={chart.id} style={{ marginBottom: '2rem' }}>
            <h4>{chart.month} - {chart.type.toUpperCase()}</h4>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={``-`${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};
export default Charts;