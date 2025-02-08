import streamlit as st
import logging
from utils.styles import load_styles
from pages.home import home_page
from pages.login import login_page
from pages.register import register_page
from pages.create_subreddit import create_subreddit_page
from pages.create_post import create_post_page

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

# Set page config
st.set_page_config(
    page_title="Reddit Clone",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load custom CSS
st.markdown(load_styles(), unsafe_allow_html=True)

def init_session_state():
    if 'user' not in st.session_state:
        st.session_state.user = None
    if 'current_subreddit' not in st.session_state:
        st.session_state.current_subreddit = None
    if 'sort_by' not in st.session_state:
        st.session_state.sort_by = "hot"
    if 'page' not in st.session_state:
        st.session_state.page = "home"

def main():
    init_session_state()
    
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