import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ZiiBotReply from './ZiiBotReply';
import ZiiBotReplyButton from './ZiiBotReplyButton';

interface Comment {
  id: number;
  post_id: string;
  username: string;
  content: string;
  created_at: string;
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
    else setComments(data);
  };

  const handleSubmit = async () => {
    if (!newComment.trim() || !username.trim()) return;
    const { error } = await supabase.from('comments').insert([
      {
        post_id: postId,
        username,
        content: newComment,
      },
    ]);
    if (error) console.error('Submit error:', error);
    else {
      setNewComment('');
      fetchComments();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="pt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 mb-4">
            <p className="font-semibold">{comment.username}</p>
            <p>{comment.content}</p>

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
    </div>
  );
}
