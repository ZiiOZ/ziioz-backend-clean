import { useState } from 'react';
import ZiiShopQuestions from './ZiiShopQuestions';
import ZiiShopPreferences from './ZiiShopPreferences';
import ZiiShopSummary from './ZiiShopSummary';

export default function ZiiShop() {
  const [step, setStep] = useState<'questions' | 'preferences' | 'summary'>('questions');

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      {step === 'questions' && (
        <ZiiShopQuestions onComplete={() => setStep('preferences')} />
      )}

      {step === 'preferences' && (
        <ZiiShopPreferences onContinue={() => setStep('summary')} />
      )}

      {step === 'summary' && <ZiiShopSummary />}
    </div>
  );
}
