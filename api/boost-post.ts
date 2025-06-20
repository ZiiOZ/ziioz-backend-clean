app.post('/api/boost-post', async (req, res) => {
  const { postId, userSession } = req.body;

  if (!postId || !userSession) {
    return res.status(400).json({ error: 'Missing postId or userSession' });
  }

  const { data: existing, error: fetchError } = await supabase
    .from('post_boosts')
    .select('id')
    .eq('post_id', postId)
    .eq('user_session', userSession);

  if (fetchError) {
    console.error('[Post Boost Fetch Error]', fetchError);
    return res.status(500).json({ error: 'Boost lookup failed' });
  }

  if (existing.length > 0) {
    return res.status(403).json({ error: 'Already boosted' });
  }

  const { error: insertError } = await supabase
    .from('post_boosts')
    .insert([{ post_id: postId, user_session: userSession }]);

  if (insertError) {
    console.error('[Post Boost Insert Error]', insertError);
    return res.status(500).json({ error: 'Boost insert failed' });
  }

  const { error: updateError } = await supabase
    .from('posts')
    .update({ boosts: supabase.raw('boosts + 1') })
    .eq('id', postId);

  if (updateError) {
    console.error('[Post Boost Update Error]', updateError);
    return res.status(500).json({ error: 'Boost increment failed' });
  }

  return res.json({ success: true });
});
