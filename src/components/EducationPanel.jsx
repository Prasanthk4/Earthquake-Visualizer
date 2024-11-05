import { useState } from 'react';

function EducationPanel() {
  const [activeTab, setActiveTab] = useState('safety');

  return (
    <div className="bg-dark-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Earthquake Education</h2>
      
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'safety' ? 'bg-blue-600' : 'bg-dark-300'
          }`}
          onClick={() => setActiveTab('safety')}
        >
          Safety Tips
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'causes' ? 'bg-blue-600' : 'bg-dark-300'
          }`}
          onClick={() => setActiveTab('causes')}
        >
          Causes
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'prepare' ? 'bg-blue-600' : 'bg-dark-300'
          }`}
          onClick={() => setActiveTab('prepare')}
        >
          Preparedness
        </button>
      </div>

      <div className="text-gray-300">
        {activeTab === 'safety' && (
          <div>
            <h3 className="font-bold mb-2">During an Earthquake:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Drop, Cover, and Hold On</li>
              <li>Stay away from windows</li>
              <li>If indoors, stay there</li>
              <li>If outdoors, move to an open area</li>
            </ul>
          </div>
        )}

        {activeTab === 'causes' && (
          <div>
            <h3 className="font-bold mb-2">What Causes Earthquakes:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tectonic plate movements</li>
              <li>Fault line activity</li>
              <li>Volcanic activity</li>
              <li>Human activities (rare)</li>
            </ul>
          </div>
        )}

        {activeTab === 'prepare' && (
          <div>
            <h3 className="font-bold mb-2">Preparation Tips:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create an emergency kit</li>
              <li>Develop a family plan</li>
              <li>Secure heavy furniture</li>
              <li>Know your area's risk level</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default EducationPanel;