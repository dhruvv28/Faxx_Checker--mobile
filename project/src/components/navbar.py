import streamlit as st

def display_navbar():
    col1, col2, col3 = st.columns([3, 6, 3])
    with col1:
        st.image("assets/reddit-logo.png", width=100)
    with col2:
        st.text_input("🔍 Search Reddit", key="search")
    with col3:
        if st.session_state.user:
            st.write(f"Welcome, u/{st.session_state.user['username']}")
        else:
            if st.button("Log In"):
                st.session_state.page = "login"
                st.experimental_rerun()