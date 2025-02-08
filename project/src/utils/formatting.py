def format_number(num):
    """Format numbers like Reddit (e.g., 1.2k, 14.5k)"""
    if num >= 1000:
        return f"{num/1000:.1f}k"
    return str(num)