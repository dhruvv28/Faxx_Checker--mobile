def load_styles():
    return """
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
    """