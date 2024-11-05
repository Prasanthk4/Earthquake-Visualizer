import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Charts({ earthquakes }) {
  const getMagnitudeDistribution = () => {
    const distribution = {};
    earthquakes.forEach(eq => {
      const mag = Math.floor(eq.properties.mag);
      distribution[mag] = (distribution[mag] || 0) + 1;
    });

    return Object.entries(distribution).map(([mag, count]) => ({
      magnitude: `${mag}-${Number(mag) + 1}`,
      count
    }));
  };

  return (
    <div className="bg-dark-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Earthquake Statistics</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getMagnitudeDistribution()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="magnitude" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2d2d2d',
                border: 'none',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
            <Bar dataKey="count" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;