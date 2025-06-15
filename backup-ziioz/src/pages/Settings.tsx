import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('ziioz_admin') === 'true'
  );
  const [showPasscodeInput, setShowPasscodeInput] = useState(false);
  const [passcode, setPasscode] = useState('');

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
    <div className="min-h-screen bg-white px-6 py-10 text-black">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600 text-sm mb-6">
        Manage your ZiiOZ experience and preferences.
      </p>

      {/* Future user settings can go here */}

      {/* 🔐 Hidden Admin Section */}
      <div className="mt-10 text-xs text-gray-400">
        {!isAdmin && !showPasscodeInput && (
          <button onClick={() => setShowPasscodeInput(true)} className="underline">
            (Admin Access?)
          </button>
        )}

        {showPasscodeInput && (
          <div className="mt-3 space-y-2">
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

      <Link
        to="/"
        className="block mt-8 text-blue-500 text-sm hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
