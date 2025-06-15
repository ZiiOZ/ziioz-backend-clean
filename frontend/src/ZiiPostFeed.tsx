import { useEffect, useState } from "react";

interface Post {
  id: string;
  content: string;
  created_at: string;
}

export default function ZiiPostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Dummy data for now — we’ll link Supabase again next
    setPosts([
      { id: "1", content: "🚀 First post on ZiiOZ!", created_at: "2025-06-15" },
      { id: "2", content: "🔥 AI comments, boosts, and more coming soon!", created_at: "2025-06-14" },
    ]);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">📡 Live Feed</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-4 shadow rounded-lg border border-gray-200"
        >
          <p className="text-gray-800">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">{post.created_at}</p>
        </div>
      ))}
    </div>
  );
}
