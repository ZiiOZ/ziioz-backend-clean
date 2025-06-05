interface Props {
  reply: string;
}

export default function ZiiBotReply({ reply }: Props) {
  if (!reply) return null;

  return (
    <div className="bg-purple-50 border-l-4 border-purple-400 text-purple-800 p-2 mt-2 rounded-md text-sm">
      <strong>ZiiBot:</strong> {reply}
    </div>
  );
}
