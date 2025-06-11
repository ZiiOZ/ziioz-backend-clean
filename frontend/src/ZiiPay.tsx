import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ZiiPay() {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Admin Unlock Logic
  const [showPasscodeInput, setShowPasscodeInput] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('ziioz_admin') === 'true'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const unlockAdmin = () => {
    if (passcode === 'letmein') {
      localStorage.setItem('ziioz_admin', 'true');
      setIsAdmin(true);
      alert('✅ Admin mode enabled');
    } else {
      alert('❌ Incorrect passcode');
    }
    setPasscode('');
    setShowPasscodeInput(false);
  };

  const disableAdmin = () => {
    localStorage.removeItem('ziioz_admin');
    setIsAdmin(false);
    alert('🚫 Admin mode disabled');
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

      {/* 🔐 Hidden Admin Section */}
      <div className="mt-10 text-xs text-gray-400 text-center">
        {!isAdmin && !showPasscodeInput && (
          <button
            onClick={() => setShowPasscodeInput(true)}
            className="underline"
          >
            (Admin?)
          </button>
        )}

        {showPasscodeInput && (
          <div className="mt-2 space-y-2">
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
            />
            <button
              onClick={unlockAdmin}
              className="block w-full bg-black text-white py-1 rounded hover:bg-gray-800"
            >
              Unlock Admin Mode
            </button>
          </div>
        )}

        {isAdmin && (
          <button
            onClick={disableAdmin}
            className="mt-4 text-red-600 underline"
          >
            Disable Admin Mode
          </button>
        )}
      </div>
    </div>
  );
}
