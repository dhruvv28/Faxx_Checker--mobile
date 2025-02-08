import streamlit as st
from datetime import datetime
import timeago
from utils.db import get_comments, has_voted, vote_post, is_moderator, delete_post, create_comment, vote_comment
from utils.formatting import format_number

def display_post(post):
    with st.container():
        st.markdown("""
            <div style="background-color: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #ccc; margin-bottom: 10px;">
        """, unsafe_allow_html=True)
        
        col1, col2 = st.columns([1, 20])
        
        with col1:
            upvoted = st.session_state.user and has_voted(post['id'], st.session_state.user['username'], 1)
            downvoted = st.session_state.user and has_voted(post['id'], st.session_state.user['username'], -1)
            
            if st.button("⬆️", key=f"up_{post['id']}", help="Upvote"):
                if not st.session_state.user:
                    st.error("Please login to vote")
                else:
                    vote_post(post['id'], st.session_state.user['username'], 1)
                    st.experimental_rerun()
            
            vote_count = post['upvotes'] - post['downvotes']
            st.markdown(f"<p style='text-align: center; font-weight: bold; color: {'#ff4500' if upvoted else '#1a1a1b'};'>{format_number(vote_count)}</p>", unsafe_allow_html=True)
            
            if st.button("⬇️", key=f"down_{post['id']}", help="Downvote"):
                if not st.session_state.user:
                    st.error("Please login to vote")
                else:
                    vote_post(post['id'], st.session_state.user['username'], -1)
                    st.experimental_rerun()
        
        with col2:
            display_post_content(post)
            display_comments(post)
        
        st.markdown("</div>", unsafe_allow_html=True)

def display_post_content(post):
    st.markdown(f"""
        <div class="post-metadata">
            Posted by u/{post['author_name']} in r/{post['subreddit_name']} • 
            {timeago.format(datetime.strptime(post['created_at'], '%Y-%m-%d %H:%M:%S'))}
        </div>
        <h3 class="post-title">{post['title']}</h3>
        <div class="post-content">{post['content']}</div>
    """, unsafe_allow_html=True)
    
    display_post_actions(post)

def display_post_actions(post):
    col1, col2, col3, col4 = st.columns([2, 2, 2, 10])
    with col1:
        comment_count = len(get_comments(post['id']))
        st.button(f"💬 {format_number(comment_count)}", key=f"comments_{post['id']}")
    with col2:
        st.button("↗️ Share", key=f"share_{post['id']}")
    with col3:
        st.button("⭐ Save", key=f"save_{post['id']}")
    
    if st.session_state.user and (st.session_state.user['username'] == post['author_name'] or 
                                is_moderator(post['subreddit_id'], st.session_state.user['username'])):
        with col4:
            if st.button("🗑️ Delete", key=f"delete_{post['id']}"):
                if delete_post(post['id']):
                    st.success("Post deleted successfully")
                    st.experimental_rerun()

def display_comments(post):
    if st.session_state.user:
        comment = st.text_area("Add a comment", key=f"comment_{post['id']}", height=100)
        if st.button("Comment", key=f"submit_comment_{post['id']}"):
            if create_comment(comment, st.session_state.user['username'], post['id']):
                st.success("Comment added!")
                st.experimental_rerun()
    
    comments = get_comments(post['id'])
    for comment in comments:
        display_comment(comment)