import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ZiiBotReplyButton from './ZiiBotReplyButton';
import ZiiBotReply from './ZiiBotReply';
import BoostButton from './BoostButton';

interface Comment {
  id: number;
  post_id: string;
  username: string;
  content: string;
  created_at: string;
  boosts: number;
  showZiiBotReply?: boolean;
  replyText?: string;
}

export default function ZiiCommentFeed({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) console.error('Error loading comments:', error);
    else setComments(data || []);
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    const { error } = await supabase.from('comments').insert([
      {
        post_id: postId,
        username: username || 'anon',
        content: newComment,
      },
    ]);
    if (!error) {
      setNewComment('');
      fetchComments();
    }
  };

  return (
    <div className="space-y-2 border-t mt-6 pt-4">
      <input
        className="w-full border p-2 rounded text-sm"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded text-sm"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        Submit Comment
      </button>

      {comments.map((comment) => (
        <div key={comment.id} className="border-b pb-4 mb-4">
          <p className="font-semibold flex items-center gap-2">
            {comment.username === 'ZiiBot' ? (
              <>
                <span className="text-purple-600">🧠</span>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                  ZiiBot
                </span>
              </>
            ) : (
              <span>@{comment.username}</span>
            )}
          </p>

          <p className="text-sm text-gray-800">{comment.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.created_at).toLocaleString()}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <BoostButton commentId={comment.id} />
            <span className="text-xs text-gray-600">{comment.boosts} boosts</span>
          </div>

          {comment.showZiiBotReply && comment.replyText && (
            <ZiiBotReply reply={comment.replyText} />
          )}

          <ZiiBotReplyButton
            comment={comment.content}
            onReply={(replyText) => {
              setComments((prev) =>
                prev.map((c) =>
                  c.id === comment.id
                    ? { ...c, showZiiBotReply: true, replyText }
                    : c
                )
              );
            }}
          />
        </div>
      ))}
    </div>
  );
}
