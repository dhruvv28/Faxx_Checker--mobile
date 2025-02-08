import streamlit as st
import database as db
import logging
from datetime import datetime
import timeago

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

# Set page config to make it wider and add favicon
st.set_page_config(
    page_title="Reddit Clone",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS to make it look more like Reddit
st.markdown("""
    <style>
    .stButton button {
        border-radius: 20px;
    }
    .main-header {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 600;
        color: #1a1a1b;
    }
    .post-title {
        font-size: 18px;
        font-weight: 500;
        color: #1a1a1b;
        text-decoration: none;
    }
    .post-metadata {
        font-size: 12px;
        color: #787c7e;
    }
    .post-content {
        font-size: 14px;
        color: #1a1a1b;
        margin: 8px 0;
    }
    .sidebar-subreddit {
        padding: 8px;
        border-radius: 4px;
        margin: 4px 0;
        background-color: #ffffff;
        transition: background-color 0.2s;
    }
    .sidebar-subreddit:hover {
        background-color: #f6f7f8;
    }
    .vote-button {
        background: none;
        border: none;
        padding: 0 4px;
        font-size: 20px;
        cursor: pointer;
    }
    .comment-section {
        margin-left: 20px;
        padding-left: 10px;
        border-left: 2px solid #edeff1;
    }
    </style>
    """, unsafe_allow_html=True)

def init_session_state():
    if 'user' not in st.session_state:
        st.session_state.user = None
    if 'current_subreddit' not in st.session_state:
        st.session_state.current_subreddit = None
    if 'sort_by' not in st.session_state:
        st.session_state.sort_by = "hot"

def format_number(num):
    """Format numbers like Reddit (e.g., 1.2k, 14.5k)"""
    if num >= 1000:
        return f"{num/1000:.1f}k"
    return str(num)

def display_post(post):
    with st.container():
        # Post container with light gray background
        st.markdown("""
            <div style="background-color: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #ccc; margin-bottom: 10px;">
        """, unsafe_allow_html=True)
        
        # Vote and content columns
        col1, col2 = st.columns([1, 20])
        
        with col1:
            # Voting buttons
            upvoted = st.session_state.user and db.has_voted(post['id'], st.session_state.user['username'], 1)
            downvoted = st.session_state.user and db.has_voted(post['id'], st.session_state.user['username'], -1)
            
            if st.button("⬆️", key=f"up_{post['id']}", help="Upvote"):
                if not st.session_state.user:
                    st.error("Please login to vote")
                else:
                    db.vote_post(post['id'], st.session_state.user['username'], 1)
                    st.experimental_rerun()
            
            # Display vote count
            vote_count = post['upvotes'] - post['downvotes']
            st.markdown(f"<p style='text-align: center; font-weight: bold; color: {'#ff4500' if upvoted else '#1a1a1b'};'>{format_number(vote_count)}</p>", unsafe_allow_html=True)
            
            if st.button("⬇️", key=f"down_{post['id']}", help="Downvote"):
                if not st.session_state.user:
                    st.error("Please login to vote")
                else:
                    db.vote_post(post['id'], st.session_state.user['username'], -1)
                    st.experimental_rerun()
        
        with col2:
            # Post metadata
            st.markdown(f"""
                <div class="post-metadata">
                    Posted by u/{post['author_name']} in r/{post['subreddit_name']} • 
                    {timeago.format(datetime.strptime(post['created_at'], '%Y-%m-%d %H:%M:%S'))}
                </div>
            """, unsafe_allow_html=True)
            
            # Post title and content
            st.markdown(f"""
                <h3 class="post-title">{post['title']}</h3>
                <div class="post-content">{post['content']}</div>
            """, unsafe_allow_html=True)
            
            # Post actions
            col1, col2, col3, col4 = st.columns([2, 2, 2, 10])
            with col1:
                comment_count = len(db.get_comments(post['id']))
                st.button(f"💬 {format_number(comment_count)}", key=f"comments_{post['id']}")
            with col2:
                st.button("↗️ Share", key=f"share_{post['id']}")
            with col3:
                st.button("⭐ Save", key=f"save_{post['id']}")
            
            # Delete button for post owner or moderators
            if st.session_state.user and (st.session_state.user['username'] == post['author_name'] or 
                                        db.is_moderator(post['subreddit_id'], st.session_state.user['username'])):
                with col4:
                    if st.button("🗑️ Delete", key=f"delete_{post['id']}"):
                        if db.delete_post(post['id']):
                            st.success("Post deleted successfully")
                            st.experimental_rerun()
            
            # Comments section
            if st.session_state.user:
                comment = st.text_area("Add a comment", key=f"comment_{post['id']}", height=100)
                if st.button("Comment", key=f"submit_comment_{post['id']}"):
                    if db.create_comment(comment, st.session_state.user['username'], post['id']):
                        st.success("Comment added!")
                        st.experimental_rerun()
            
            # Display comments
            comments = db.get_comments(post['id'])
            for comment in comments:
                with st.container():
                    st.markdown("""
                        <div style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #edeff1;">
                    """, unsafe_allow_html=True)
                    
                    # Comment metadata
                    st.markdown(f"""
                        <div class="post-metadata">
                            u/{comment['author_name']} • 
                            {timeago.format(datetime.strptime(comment['created_at'], '%Y-%m-%d %H:%M:%S'))}
                        </div>
                    """, unsafe_allow_html=True)
                    
                    # Comment content
                    st.markdown(f"""
                        <div class="post-content">{comment['content']}</div>
                    """, unsafe_allow_html=True)
                    
                    # Comment actions
                    col1, col2, col3 = st.columns([1, 1, 10])
                    with col1:
                        if st.button("⬆️", key=f"up_comment_{comment['id']}"):
                            if not st.session_state.user:
                                st.error("Please login to vote")
                            else:
                                db.vote_comment(comment['id'], st.session_state.user['username'], 1)
                                st.experimental_rerun()
                    with col2:
                        if st.button("⬇️", key=f"down_comment_{comment['id']}"):
                            if not st.session_state.user:
                                st.error("Please login to vote")
                            else:
                                db.vote_comment(comment['id'], st.session_state.user['username'], -1)
                                st.experimental_rerun()
                    
                    st.markdown("</div>", unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)

def home_page():
    # Top navigation bar
    col1, col2, col3 = st.columns([3, 6, 3])
    with col1:
        st.image("reddit-logo.png", width=100)
    with col2:
        st.text_input("🔍 Search Reddit", key="search")
    with col3:
        if st.session_state.user:
            st.write(f"Welcome, u/{st.session_state.user['username']}")
        else:
            if st.button("Log In"):
                st.session_state.page = "login"
                st.experimental_rerun()
    
    # Main content area
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Sorting options
        sort_col1, sort_col2, sort_col3, sort_col4 = st.columns(4)
        with sort_col1:
            if st.button("🔥 Hot", use_container_width=True):
                st.session_state.sort_by = "hot"
        with sort_col2:
            if st.button("⭐ New", use_container_width=True):
                st.session_state.sort_by = "new"
        with sort_col3:
            if st.button("📈 Top", use_container_width=True):
                st.session_state.sort_by = "top"
        with sort_col4:
            if st.button("💎 Best", use_container_width=True):
                st.session_state.sort_by = "best"
        
        # Display posts
        posts = db.get_posts(st.session_state.current_subreddit, sort_by=st.session_state.sort_by)
        for post in posts:
            display_post(post)
    
    with col2:
        # Sidebar content
        if st.session_state.current_subreddit:
            subreddit = db.get_subreddit(st.session_state.current_subreddit)
            st.markdown(f"""
                <div style="background-color: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #ccc;">
                    <h3>About r/{subreddit['name']}</h3>
                    <p>{subreddit['description']}</p>
                    <p>Created {timeago.format(datetime.strptime(subreddit['created_at'], '%Y-%m-%d %H:%M:%S'))}</p>
                </div>
            """, unsafe_allow_html=True)
        
        # Create Post/Subreddit buttons
        if st.session_state.user:
            if st.button("➕ Create Post", use_container_width=True):
                st.session_state.page = "create_post"
                st.experimental_rerun()
            if st.button("🎯 Create Community", use_container_width=True):
                st.session_state.page = "create_subreddit"
                st.experimental_rerun()
        
        # Popular subreddits
        st.markdown("""
            <div style="background-color: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #ccc; margin-top: 20px;">
                <h3>Popular Communities</h3>
            </div>
        """, unsafe_allow_html=True)
        
        subreddits = db.get_subreddits()
        for subreddit in subreddits:
            if st.button(f"r/{subreddit['name']}", key=f"subreddit_{subreddit['id']}", use_container_width=True):
                st.session_state.current_subreddit = subreddit['id']
                st.experimental_rerun()

def main():
    init_session_state()
    
    # Initialize page state
    if 'page' not in st.session_state:
        st.session_state.page = "home"
    
    # Route to appropriate page
    if st.session_state.page == "login":
        login_page()
    elif st.session_state.page == "register":
        register_page()
    elif st.session_state.page == "create_subreddit":
        create_subreddit_page()
    elif st.session_state.page == "create_post":
        create_post_page()
    else:
        home_page()

if __name__ == "__main__":
    main()