import { saveAs } from 'file-saver';

function ExportData({ earthquakes }) {
  const exportToCSV = () => {
    const headers = ['Time', 'Magnitude', 'Depth', 'Location', 'Latitude', 'Longitude'];
    const data = earthquakes.map(eq => [
      new Date(eq.properties.time).toISOString(),
      eq.properties.mag,
      eq.geometry.coordinates[2],
      eq.properties.place,
      eq.geometry.coordinates[1],
      eq.geometry.coordinates[0]
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'earthquake_data.csv');
  };

  const exportToJSON = () => {
    const data = earthquakes.map(eq => ({
      time: new Date(eq.properties.time).toISOString(),
      magnitude: eq.properties.mag,
      depth: eq.geometry.coordinates[2],
      location: eq.properties.place,
      coordinates: {
        lat: eq.geometry.coordinates[1],
        lng: eq.geometry.coordinates[0]
      }
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    saveAs(blob, 'earthquake_data.json');
  };

  return (
    <div className="bg-dark-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Export Data</h2>
      
      <div className="space-x-4">
        <button
          onClick={exportToCSV}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Export as CSV
        </button>
        <button
          onClick={exportToJSON}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Export as JSON
        </button>
      </div>
    </div>
  );
}

export default ExportData;