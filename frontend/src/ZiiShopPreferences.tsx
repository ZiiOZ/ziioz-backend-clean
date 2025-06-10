// src/ZiiShopPreferences.tsx
import { useState } from 'react';

const layoutOptions = ['Grid', 'Carousel', 'Magazine'];
const marketingOptions = ['Starter', 'Pro', 'Advanced'];
const addons = ['AR Support', 'AI Enhancer', 'Analytics Suite'];
const engagementOptions = ['Creator', 'Influencer', 'Affiliate'];

export default function ZiiShopPreferences() {
  const [layout, setLayout] = useState('');
  const [marketing, setMarketing] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [engagement, setEngagement] = useState('');

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Choose Store Preferences</h2>

      {/* Layout */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Layout Style:</label>
        <select value={layout} onChange={(e) => setLayout(e.target.value)} className="w-full border px-4 py-2 rounded">
          <option value="">Select</option>
          {layoutOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Marketing */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Marketing Package:</label>
        <select value={marketing} onChange={(e) => setMarketing(e.target.value)} className="w-full border px-4 py-2 rounded">
          <option value="">Select</option>
          {marketingOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Addons */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Add-Ons:</label>
        <div className="flex flex-wrap gap-2">
          {addons.map((addon) => (
            <button
              key={addon}
              onClick={() => toggleAddon(addon)}
              className={`px-3 py-1 rounded border ${
                selectedAddons.includes(addon) ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {addon}
            </button>
          ))}
        </div>
      </div>

      {/* Engagement */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Engagement Model:</label>
        <select value={engagement} onChange={(e) => setEngagement(e.target.value)} className="w-full border px-4 py-2 rounded">
          <option value="">Select</option>
          {engagementOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => alert('Preferences saved!')}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Save and Finish
      </button>
    </div>
  );
}
