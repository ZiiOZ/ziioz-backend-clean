import { useState } from 'react';

const questions = [
  'What type of products or services will you offer?',
  'Do you want a storefront or a profile-based layout?',
  'Select your preferred marketing level: Basic, Pro, or Max Impact?',
  'Would you like to collaborate with creators, influencers, or affiliates?',
  'Do you want AI or AR features in your store setup?',
];

export default function ZiiShopQuestions({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleNext = (answer: string) => {
    const updated = [...answers];
    updated[current] = answer;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      console.log('Answers:', updated);
      onComplete(); // Proceed to next onboarding phase
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl max-w-lg mx-auto text-center mt-6">
      <h2 className="text-xl font-semibold mb-4">🧠 Smart Setup Question {current + 1}</h2>
      <p className="mb-4 text-gray-700">{questions[current]}</p>

      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleNext((e.target as HTMLInputElement).value);
        }}
        placeholder="Type your answer and press Enter"
        className="border border-gray-300 rounded px-4 py-2 w-full"
      />
    </div>
  );
}
