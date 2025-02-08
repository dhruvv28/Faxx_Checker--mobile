import pool from '../config/db.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, subreddit_id } = req.body;
    const author = req.user.username;
    
    const [result] = await pool.execute(
      'INSERT INTO posts (title, content, author, subreddit_id) VALUES (?, ?, ?, ?)',
      [title, content, author, subreddit_id]
    );
    
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    console.log('Fetching posts...'); // Debug log

    const [posts] = await pool.execute(`
      SELECT p.*, 
             s.name as subreddit_name,
             COUNT(DISTINCT c.id) as comment_count,
             COALESCE(SUM(v.vote_type), 0) as votes
      FROM posts p
      JOIN subreddits s ON p.subreddit_id = s.id
      LEFT JOIN comments c ON p.id = c.post_id
      LEFT JOIN votes v ON p.id = v.post_id
      GROUP BY p.id, p.title, p.content, p.author, p.created_at, p.subreddit_id, s.name
      ORDER BY p.created_at DESC
      LIMIT 20
    `);
    
    console.log('Posts fetched:', posts); // Debug log
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
};