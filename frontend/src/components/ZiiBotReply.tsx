// src/components/comments/ZiiBotReply.tsx
interface Props {
  reply: string;
}

export default function ZiiBotReply({ reply }: Props) {
  return (
    <div className="mt-2 p-2 bg-blue-50 text-blue-900 border border-blue-200 rounded">
      <strong>ZiiBot:</strong> {reply}
    </div>
  );
}
