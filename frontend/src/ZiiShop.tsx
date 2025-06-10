import { useState } from 'react';

const businessTypes = [
  'Retail / eCommerce',
  'Food & Beverage',
  'Fashion / Apparel',
  'Services / Freelance',
  'Digital Goods / Courses',
  'Influencer / Creator Store',
  'Affiliate Marketer',
  'Other'
];

export default function ZiiShop() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedType) return alert('Please select your business type.');
    localStorage.setItem('ziishop_business_type', selectedType);
    // TODO: Route to next onboarding step
    alert(`✅ Selected: ${selectedType} — Routing to next step...`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        What type of business are you setting up?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md w-full">
        {businessTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`border px-4 py-3 rounded-lg text-center text-sm font-medium transition-all ${
              selectedType === type
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Continue
      </button>
    </div>
  );
}
