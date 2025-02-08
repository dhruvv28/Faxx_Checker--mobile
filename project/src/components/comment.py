import streamlit as st
from datetime import datetime
import timeago
from utils.db import vote_comment

def display_comment(comment):
    with st.container():
        st.markdown("""
            <div style="margin-left: 20px; padding-left: 10px; border-left: 2px solid #edeff1;">
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
            <div class="post-metadata">
                u/{comment['author_name']} • 
                {timeago.format(datetime.strptime(comment['created_at'], '%Y-%m-%d %H:%M:%S'))}
            </div>
            <div class="post-content">{comment['content']}</div>
        """, unsafe_allow_html=True)
        
        col1, col2, col3 = st.columns([1, 1, 10])
        with col1:
            if st.button("⬆️", key=f"up_comment_{comment['id']}"):
                if not st.session_state.user:
                    st.error("Please login to vote")
                else:
                    vote_comment(comment['id'], st.session_state.user['username'], 1)
                    st.experimental_rerun()
        with col2:
            if st.button("⬇️", key=f"down_comment_{comment['id']}"):
                if not st.session_state.user:
                    st.error("Please login to vote")
                else:
                    vote_comment(comment['id'], st.session_state.user['username'], -1)
                    st.experimental_rerun()
        
        st.markdown("</div>", unsafe_allow_html=True)