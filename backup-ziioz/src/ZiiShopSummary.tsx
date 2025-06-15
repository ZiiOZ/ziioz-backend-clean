// src/ZiiShopSummary.tsx

export default function ZiiShopSummary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 ZiiShop Setup Complete!</h2>
        <p className="text-gray-700 mb-6">
          Your smart onboarding is done and preferences are saved. You’re now ready to activate your ZiiShop and begin customizing your storefront.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Launch My Shop
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
