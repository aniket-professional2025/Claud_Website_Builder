# Importing Required Libraries
import streamlit as st
from dom_generator import generate_dom_code
import os
import pathlib
import shutil

# Create the directory for generated websites if it doesn't exist
OUTPUT_DIR = "generated_websites"
pathlib.Path(OUTPUT_DIR).mkdir(exist_ok=True)

# Utility function to refresh the app in order to delete the files once created
def refresh_app(base_dir):
    for item in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path) and item == "node_modules":
            continue
        if os.path.isdir(item_path):
            shutil.rmtree(item_path)
        else:
            os.remove(item_path)

# Streamlit App Configuration
st.set_page_config(page_title="Website Generator", layout="wide")
st.title("AI Website Builder")

# Custom CSS
st.markdown(
    """
    <style>
    .stButton>button {
        width: 100%;
        border-radius: 9999px;
        background-color: #2563eb;
        color: white;
        font-weight: bold;
        transition: background-color 0.2s;
        margin-bottom: 10px;
    }
    .stButton>button:hover {
        background-color: #1e40af;
    }

    .stTextArea textarea {
        background-color: #100b40;
        border: 2px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        font-size: 18px;
        color: #fffcfc;
    }
    .stTextArea textarea:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }

    .word-count-container {
        position: relative;
    }
    .word-count {
        position: absolute;
        top: 5px;
        right: 15px;
        color: #888;
        font-size: 12px;
        pointer-events: none;
        background-color: transparent;
        z-index: 10;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Word Count State Management
if "prompt" not in st.session_state:
    st.session_state.prompt = ""
    st.session_state.word_count = 0

def update_word_count():
    words = st.session_state.prompt.strip().split()
    st.session_state.word_count = len(words)

# User Input Section
st.header("Describe Your Website Idea here")

with st.container():
    prompt = st.text_area(
        "Enter a detailed description of the website you want to build",
        key="prompt",
        on_change=update_word_count,
        placeholder="Enter your prompt here...",
    )
    current_word_count = st.session_state.word_count
    max_words = 600

    count_color = "red" if current_word_count > max_words else "gray"
    st.markdown(
        f'<div class="word-count-container"><div class="word-count" style="color:{count_color};">{current_word_count}/{max_words} words</div></div>',
        unsafe_allow_html=True,
    )

    if current_word_count > max_words:
        st.warning(f"Word count exceeds the limit of {max_words}.")

# Buttons vertically stacked
generate_clicked = st.button("Generate Website", disabled=(current_word_count > max_words))
refresh_clicked = st.button("Refresh")

if generate_clicked:
    if prompt:
        log_placeholder = st.empty()
        st.divider()

        project_dir = OUTPUT_DIR
        generated_dir = None

        for log in generate_dom_code(prompt, project_dir):
            with log_placeholder.container():
                st.info(log)
            generated_dir = log

        if generated_dir and "Error" not in generated_dir:
            st.success(f"Project generated successfully in `{OUTPUT_DIR}`")

            app_jsx_path = os.path.join(project_dir, "src", "App.jsx")

            # Split into 2 columns (50-50)
            code_col, preview_col = st.columns(2)

            with code_col:
                st.markdown("### App.jsx Code")
                if os.path.exists(app_jsx_path):
                    with open(app_jsx_path, "r") as file:
                        app_jsx_code = file.read()
                    # Scrollable code block
                    st.code(app_jsx_code, language="jsx")
                else:
                    st.warning("App.jsx file not found in the generated project.")

            with preview_col:
                st.markdown("### Live Preview")
                st.markdown(
                    f'<iframe src="https://aedd6b2cbcfe.ngrok-free.app" style="height:500px;width:100%;border:none;"></iframe>',
                    unsafe_allow_html=True, # https://aedd6b2cbcfe.ngrok-free.app
                )
        else:
            st.error("Failed to generate the project. Please check the logs above for details.")
    else:
        st.warning("Please enter a prompt to generate a website.")

if refresh_clicked:
    try:
        refresh_app(OUTPUT_DIR)
        st.success("Page Refreshed")
    except Exception as e:

        st.error(f"Failed to refresh projects: {e}")
