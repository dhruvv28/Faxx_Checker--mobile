import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL Database: {e}")
        return None

def get_posts(subreddit_id=None, sort_by="hot"):
    conn = get_db_connection()
    if not conn:
        return []

    try:
        cursor = conn.cursor(dictionary=True)
        
        query = """
            SELECT p.*, 
                   s.name as subreddit_name,
                   COUNT(DISTINCT c.id) as comment_count,
                   COALESCE(SUM(v.vote_type), 0) as votes
            FROM posts p
            JOIN subreddits s ON p.subreddit_id = s.id
            LEFT JOIN comments c ON p.id = c.post_id
            LEFT JOIN votes v ON p.id = v.post_id
        """
        
        params = []
        if subreddit_id:
            query += " WHERE p.subreddit_id = %s"
            params.append(subreddit_id)
        
        query += " GROUP BY p.id"
        
        if sort_by == "hot":
            query += " ORDER BY votes DESC, p.created_at DESC"
        elif sort_by == "new":
            query += " ORDER BY p.created_at DESC"
        elif sort_by == "top":
            query += " ORDER BY votes DESC"
        
        cursor.execute(query, params)
        posts = cursor.fetchall()
        return posts
    except Error as e:
        print(f"Error fetching posts: {e}")
        return []
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# Add other database functions here (get_comments, vote_post, etc.)