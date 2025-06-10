import { useState } from 'react';

export default function ZiiShopOnboarding() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [layout, setLayout] = useState('');
  const [complete, setComplete] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setComplete(true);
  };

  if (complete) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">🎉 You're In!</h2>
        <p className="text-gray-600">Your ZiiShop is being set up. Let’s make you famous.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-gray-100 rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">🚀 ZiiShop Smart Setup</h1>

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Luna Glow Skincare"
              className="w-full p-2 border rounded mb-4"
            />
            <button onClick={handleNext} className="w-full bg-blue-500 text-white py-2 rounded">
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select industry...</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="tech">Tech</option>
              <option value="fitness">Fitness</option>
              <option value="services">Services</option>
            </select>
            <button onClick={handleNext} className="w-full bg-blue-500 text-white py-2 rounded">
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Layout Style</label>
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Choose layout...</option>
              <option value="grid">Grid Showcase</option>
              <option value="carousel">Carousel Display</option>
              <option value="minimal">Minimal</option>
              <option value="premium">Premium Brand</option>
            </select>
            <button onClick={handleNext} className="w-full bg-blue-500 text-white py-2 rounded">
              Finish Setup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
