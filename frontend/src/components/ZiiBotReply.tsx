export default function ZiiBotReply({ reply }: { reply: string }) {
  return (
    <div className="bg-gray-100 mt-2 p-2 rounded border text-sm text-gray-800">
      <p><strong>ZiiBot:</strong> {reply}</p>
    </div>
  );
}
