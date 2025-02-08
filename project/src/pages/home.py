import streamlit as st
from datetime import datetime
import timeago
from components.post import display_post
from components.sidebar import display_sidebar
from components.navbar import display_navbar
from utils.db import get_posts, get_subreddits

def home_page():
    # Display navigation bar
    display_navbar()
    
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
        posts = get_posts(st.session_state.current_subreddit, sort_by=st.session_state.sort_by)
        for post in posts:
            display_post(post)
    
    with col2:
        display_sidebar()