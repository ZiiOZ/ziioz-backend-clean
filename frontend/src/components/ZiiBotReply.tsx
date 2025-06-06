// ZiiBotReply.tsx
import React from 'react';

export default function ZiiBotReply({ reply }: { reply: string }) {
  return (
    <div className="bg-purple-50 border-l-4 border-purple-500 text-purple-800 text-sm p-3 rounded mt-2">
      <div className="font-semibold flex items-center gap-1">
        <span>🧠</span>
        <span>ZiiBot</span>
      </div>
      <p className="mt-1 whitespace-pre-wrap">{reply}</p>
    </div>
  );
}
