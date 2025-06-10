// src/ZiiShopSummary.tsx
export default function ZiiShopSummary() {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Setup Complete!</h2>
      <p className="text-gray-700 mb-6">
        Your ZiiShop has been successfully set up. You’re now ready to sell, connect, and grow within the ZiiOZ ecosystem.
      </p>

      <div className="text-sm text-gray-500 mb-6">
        You can update your shop settings anytime from your profile dashboard.
      </div>

      <button
        onClick={() => alert('Redirecting to your shop dashboard...')}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Go to My ZiiShop
      </button>
    </div>
  );
}
