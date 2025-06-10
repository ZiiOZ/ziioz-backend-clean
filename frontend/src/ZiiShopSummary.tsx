import { useNavigate } from 'react-router-dom';

export default function ZiiShopSummary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 ZiiShop Ready!</h2>
        <p className="text-gray-700 mb-6">
          You’ve successfully completed your smart store onboarding. Your ZiiShop is ready to go live. Review and launch whenever you’re ready!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Return Home
          </button>
          <button
            onClick={() => alert('🚀 ZiiShop Launching...')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Launch My ZiiShop
          </button>
        </div>
      </div>
    </div>
  );
}
