import streamlit as st
from datetime import datetime
import timeago
from utils.db import get_subreddit, get_subreddits

def display_sidebar():
    if st.session_state.current_subreddit:
        display_subreddit_info()
    
    display_create_buttons()
    display_popular_communities()

def display_subreddit_info():
    subreddit = get_subreddit(st.session_state.current_subreddit)
    st.markdown(f"""
        <div style="background-color: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #ccc;">
            <h3>About r/{subreddit['name']}</h3>
            <p>{subreddit['description']}</p>
            <p>Created {timeago.format(datetime.strptime(subreddit['created_at'], '%Y-%m-%d %H:%M:%S'))}</p>
        </div>
    """, unsafe_allow_html=True)

def display_create_buttons():
    if st.session_state.user:
        if st.button("➕ Create Post", use_container_width=True):
            st.session_state.page = "create_post"
            st.experimental_rerun()
        if st.button("🎯 Create Community", use_container_width=True):
            st.session_state.page = "create_subreddit"
            st.experimental_rerun()

def display_popular_communities():
    st.markdown("""
        <div style="background-color: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #ccc; margin-top: 20px;">
            <h3>Popular Communities</h3>
        </div>
    """, unsafe_allow_html=True)
    
    subreddits = get_subreddits()
    for subreddit in subreddits:
        if st.button(f"r/{subreddit['name']}", key=f"subreddit_{subreddit['id']}", use_container_width=True):
            st.session_state.current_subreddit = subreddit['id']
            st.experimental_rerun()