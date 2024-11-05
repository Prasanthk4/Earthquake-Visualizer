import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FilterPanel({ onFilterChange }) {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    minMagnitude: '',
    maxMagnitude: '',
    region: 'all',
  });

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-dark-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Filter Earthquakes</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300">Start Date</label>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => handleChange('startDate', date)}
            className="w-full p-2 rounded bg-dark-300 text-white"
            maxDate={new Date()}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300">End Date</label>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => handleChange('endDate', date)}
            className="w-full p-2 rounded bg-dark-300 text-white"
            maxDate={new Date()}
            minDate={filters.startDate}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Min Magnitude</label>
          <input
            type="number"
            value={filters.minMagnitude}
            onChange={(e) => handleChange('minMagnitude', e.target.value)}
            className="w-full p-2 rounded bg-dark-300 text-white"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Max Magnitude</label>
          <input
            type="number"
            value={filters.maxMagnitude}
            onChange={(e) => handleChange('maxMagnitude', e.target.value)}
            className="w-full p-2 rounded bg-dark-300 text-white"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Region</label>
          <select
            value={filters.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full p-2 rounded bg-dark-300 text-white"
          >
            <option value="all">All Regions</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="namerica">North America</option>
            <option value="samerica">South America</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;