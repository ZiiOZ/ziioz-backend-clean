app.post('/api/boost-comment', async (req, res) => {
  const { commentId, userSession } = req.body;

  if (!commentId || !userSession) {
    return res.status(400).json({ error: 'Missing commentId or userSession' });
  }

  const { data: existing, error: fetchError } = await supabase
    .from('comment_boosts')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_session', userSession);

  if (fetchError) return res.status(500).json({ error: 'Boost lookup failed' });
  if (existing.length > 0) return res.status(403).json({ error: 'Already boosted' });

  const { error: insertError } = await supabase
    .from('comment_boosts')
    .insert([{ comment_id: commentId, user_session: userSession }]);

  if (insertError) return res.status(500).json({ error: 'Boost insert failed' });

  const { error: updateError } = await supabase
    .from('comments')
    .update({ boosts: supabase.raw('boosts + 1') })
    .eq('post_id', commentId); // your primary key may still be post_id

  if (updateError) return res.status(500).json({ error: 'Boost increment failed' });

  // ✅ Fetch new boost count
  const { data: commentData, error: fetchUpdated } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', commentId)
    .single();

  if (!commentData || fetchUpdated) return res.json({ success: true });

  const boostCount = commentData.boosts;

  // ✅ Trigger ZiiBot auto-reply if boost count == 3 and no ZiiBot comment exists
  if (boostCount === 3) {
    const { data: existingZiiBot } = await supabase
      .from('comments')
      .select('id')
      .eq('post_id', commentId)
      .eq('username', 'ZiiBot');

    if ((existingZiiBot || []).length === 0) {
      await supabase.from('comments').insert([
        {
          post_id: commentId,
          username: 'ZiiBot',
          content: '🧠 This comment is catching fire. Keep the momentum going.',
        },
      ]);
    }
  }

  return res.json({ success: true });
});
