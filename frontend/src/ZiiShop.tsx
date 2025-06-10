import { useState } from 'react';
import ZiiShopQuestions from './ZiiShopQuestions';
import ZiiShopPreferences from './ZiiShopPreferences';

export default function ZiiShop() {
  const [step, setStep] = useState<'questions' | 'preferences'>('questions');

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      {step === 'questions' ? (
        <ZiiShopQuestions onComplete={() => setStep('preferences')} />
      ) : (
        <ZiiShopPreferences onComplete={() => alert('Store setup complete!')} />
      )}
    </div>
  );
}
