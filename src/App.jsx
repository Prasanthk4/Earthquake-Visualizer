import { useState } from 'react';
import Map from './components/Map';
import FilterPanel from './components/FilterPanel';
import Charts from './components/Charts';
import EducationPanel from './components/EducationPanel';
import ExportData from './components/ExportData';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    minMagnitude: '',
    maxMagnitude: '',
    region: 'all',
  });
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-dark-100">
      <header className="bg-dark-200 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Global Earthquake Visualizer</h1>
        <p className="text-gray-400">Real-time earthquake data from USGS</p>
      </header>

      <div className="flex h-[calc(100vh-76px)]">
        <div className="w-80 p-4 space-y-4 overflow-y-auto">
          <FilterPanel onFilterChange={handleFilterChange} />
          <Charts earthquakes={earthquakes} />
          <EducationPanel />
          <ExportData earthquakes={earthquakes} />
        </div>

        <main className="flex-1">
          <Map
            filters={filters}
            onEarthquakeClick={setSelectedEarthquake}
          />
        </main>
      </div>
    </div>
  );
}

export default App;