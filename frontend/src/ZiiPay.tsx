import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ZiiPay() {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">ZiiPay Setup</h1>
      <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
        ZiiPay will allow businesses and creators to process payments natively within ZiiOZ. Complete your early interest form below. Full launch coming soon.
      </p>

      {isSubmitted ? (
        <div className="bg-green-100 text-green-700 px-6 py-4 rounded shadow">
          ✅ Thanks for your interest in ZiiPay! We’ll contact you closer to launch.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business or Creator Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
          >
            Submit Interest
          </button>
        </form>
      )}

      <Link
        to="/"
        className="mt-6 text-blue-500 text-sm hover:underline"
      >
        ← Back to ZiiOZ Home
      </Link>
    </div>
  );
}
