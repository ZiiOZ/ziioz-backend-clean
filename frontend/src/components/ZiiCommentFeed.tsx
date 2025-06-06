return (
  <div className="space-y-4 border-t mt-6 pt-4">
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

    {comments.length === 0 ? (
      <p className="text-center text-gray-400 text-sm mt-4">
        No comments yet — be the first!
      </p>
    ) : (
      comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow p-3">
          <p className="text-xs text-gray-500 mb-1">
            {new Date(comment.created_at).toLocaleString()}
          </p>
          <p className="text-sm font-medium text-gray-800 mb-1">
            @{comment.username || 'anonymous'}
          </p>
          <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>

          <div className="flex items-center justify-between mt-3">
            <BoostButton commentId={comment.id} />
            <ZiiBotReplyButton
              comment={comment.content}
              onReply={(replyText) =>
                setComments((prev) =>
                  prev.map((c) =>
                    c.id === comment.id
                      ? { ...c, showZiiBotReply: true, replyText }
                      : c
                  )
                )
              }
            />
          </div>

          {comment.showZiiBotReply && comment.replyText && (
            <ZiiBotReply reply={comment.replyText} />
          )}
        </div>
      ))
    )}
  </div>
);
