# Importing Required Libraries
import streamlit as st
from dom_generator import generate_dom_code
import os
import pathlib
import time

# Create the directory for generated websites if it doesn't exist
OUTPUT_DIR = "generated_websites"
pathlib.Path(OUTPUT_DIR).mkdir(exist_ok = True)

# Streamlit App Configuration
st.set_page_config(page_title = "Website Generator", layout = "wide")
st.title("AI Website Builder")

# Custom CSS for better button styling
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
    }
    .stButton>button:hover {
        background-color: #1e40af;
    }

    .stTextArea textarea {
        background-color: #100b40; /* Light gray background */
        border: 2px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        font-size: 18px;
        color: #965d5d;
    }
    .stTextArea textarea:focus {
        border-color: #2563eb; /* Blue border on focus */
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }

    .stTabs [data-testid="stTabContent"] {
        font-size: 20px; 
    }
    .stTabs [data-testid="stTab"] {
        font-size: 20px;
        font-weight: bold;
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
        pointer-events: none; /* Make the label unclickable */
        background-color: transparent;
        z-index: 10;
    }

    </style>
    """, unsafe_allow_html = True)

# NEW WORD COUNT LOGIC
if 'prompt' not in st.session_state:
    st.session_state.prompt = ""
    st.session_state.word_count = 0

def update_word_count():
    words = st.session_state.prompt.strip().split()
    st.session_state.word_count = len(words)

# User Input Section
st.header("Describe Your Website Idea here")

# Wrap the text area in a container for custom positioning
with st.container():
    prompt = st.text_area(
        "Enter a detailed description of the website you want to build",
        key="prompt",
        on_change=update_word_count,
        placeholder="Enter your prompt here..."
    )
    # Get the word count from session state
    current_word_count = st.session_state.word_count
    max_words = 600

    # Display the word count using a markdown element with custom CSS class
    count_color = "red" if current_word_count > max_words else "gray"
    st.markdown(f'<div class="word-count-container"><div class="word-count" style="color:{count_color};">{current_word_count}/{max_words} words</div></div>', unsafe_allow_html=True)

    # Enforce word limit by disabling the button
    if current_word_count > max_words:
        st.warning(f"Word count exceeds the limit of {max_words}.")

# Generate Website Button
if st.button("Generate Website", disabled=(current_word_count > max_words)):
    if prompt:
        log_placeholder = st.empty()
        st.divider()

        # Create a unique directory for this project
        project_dir = OUTPUT_DIR

        # Display live logs from the generator and get the final result
        generated_dir = None
        for log in generate_dom_code(prompt, project_dir):
            with log_placeholder.container():
                st.info(log)
            # The last yielded value is the path of the generated directory
            generated_dir = log

        if generated_dir and "Error" not in generated_dir:
            st.write(f"Project generated successfully in `{OUTPUT_DIR}`")
            st.write(f"Your project is located at: `{OUTPUT_DIR}`")

            # Define the path to the App.jsx file
            app_jsx_path = os.path.join(project_dir, 'src', 'App.jsx')
            
            # Create the tabs for code and preview
            code_tab, preview_tab = st.tabs(["Code", "Preview"])

            with code_tab:
                st.markdown("### App.jsx Code")
                if os.path.exists(app_jsx_path):
                    with open(app_jsx_path, 'r') as file:
                        app_jsx_code = file.read()
                    st.code(app_jsx_code, language='jsx')
                else:
                    st.warning("App.jsx file not found in the generated project.")
            
            with preview_tab:
                st.markdown("### Live Preview")
                st.info("To view the website, you need to run a local web server (e.g., `npm start` or `npx serve`) in the generated project directory and then access it from a browser. " \
                "Streamlit doesn't execute the project directly.")
                st.markdown(f'<iframe src="https://53ff5145c5b7.ngrok-free.app/" style="height:500px;width:100%;"></iframe>', unsafe_allow_html=True)

        else:
            st.error("Failed to generate the project. Please check the logs above for details.")
    else:
        st.warning("Please enter a prompt to generate a website.")