# Importing Required Libraries
import anthropic
import os
import time
import re
import pathlib
from dotenv import load_dotenv
load_dotenv()

# Function to Generate DOM Code
def generate_dom_code(user_prompt: str, output_dir: str):
    
    time.sleep(2)
    yield "Starting the website generation process..."
    time.sleep(3)
    yield "Reading user prompt and crafting system prompt..."
    time.sleep(3)
    
    # It's recommended to set your API key as an environment variable
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        yield "Error: ANTHROPIC_API_KEY environment variable not set."
        return

    # Clear any proxy environment variables that might interfere with the client
    # The Anthropic client uses the `httpx` library, which automatically reads these.
    if "HTTP_PROXY" in os.environ:
        del os.environ["HTTP_PROXY"]
    if "HTTPS_PROXY" in os.environ:
        del os.environ["HTTPS_PROXY"]
    if "http_proxy" in os.environ:
        del os.environ["http_proxy"]
    if "https_proxy" in os.environ:
        del os.environ["https_proxy"]

    # Setting the Client with the API Key
    client = anthropic.Anthropic(api_key=api_key)

    yield "Client initialized successfully."
    time.sleep(3)
    yield "Breaking user prompt into multiple tasks..."
    time.sleep(3)

    system_prompt = """
    You are an expert AI website builder. Your task is to generate the complete code for a modern, multi-file React.js and Tailwind CSS project. The final output must be a single text response containing the code for all necessary files, separated by a specific markdown format.
    The project should be configured using Vite for a fast and efficient development experience.
    **Project File Structure:**
    - `index.html`: The main entry point for the application.
    - `src/main.jsx`: The JavaScript entry point that renders the React App.
    - `src/App.jsx`: The main React component that builds the entire website.
    - `src/index.css`: A simple CSS file to include Tailwind directives.
    - `package.json`: Defines project metadata and dependencies.
    - `vite.config.js`: The Vite configuration file. Always allow the host 53ff5145c5b7.ngrok-free.app to server.allowedHosts
    - **`src/components/`**: A new directory for all reusable React components. Any component referenced by App.jsx must be defined here.

    **Instructions for Code Generation:**
    - **Generate all necessary component files.** If App.jsx references a component (e.g., `<Header />`), you must create a corresponding file in the `src/components/` directory (e.g., `src/components/Header.jsx`).
    - Ensure all components are fully implemented and do not contain placeholder code.
    - Use `import` and `export` statements to organize the code logically across files.
    - All styling must be done using Tailwind CSS utility classes.
    - The website must be fully responsive and visually appealing.
    - The website must be based entirely on the user's prompt.
    - Do not include any placeholder text like `...`. Generate complete, well-formed code for each file.
    - Do not include any additional commentary, markdown, or text outside the specified file blocks.
    - Output each file's content enclosed in a specific markdown format:
  
    <file path="path/to/file.extension">
        ...code goes here...
    </file>

    For example: <file path="src/App.jsx">...code...</file>
    """

    yield "Calling the LLM with the system and user prompts..."
    time.sleep(10)

    try:
        response = client.messages.create(
            model="claude-3-7-sonnet-latest", # claude-3-5-sonnet-20241022 | claude-3-7-sonnet-20250219
            max_tokens = 4096,
            system = system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": f"Generate a website for: {user_prompt}"
                }
            ],
        )

        # The response is a generator for live streaming. We will simulate this for Streamlit.
        full_response = response.content[0].text
        
        yield "AI response received. Parsing and saving files..."
        time.sleep(3)

        # Use a regex to find all file blocks in the response
        file_blocks = re.findall(r'<file path="(.+?)">\s*(.*?)\s*</file>', full_response, re.DOTALL)
        if not file_blocks:
            yield "Error: No file blocks found in the AI's response. Generation failed."
            return None
        
        # Create the project directory
        pathlib.Path(output_dir).mkdir(parents = True, exist_ok = True)

        # Save each file from the AI's response
        for file_path, content in file_blocks:
            full_path = pathlib.Path(output_dir) / file_path

            # Create subdirectories if they don't exist
            full_path.parent.mkdir(parents = True, exist_ok = True)

            with open(full_path, "w", encoding = "utf-8") as f:
                f.write(content.strip())

            yield f"Saved file: `{file_path}`"
            time.sleep(3)
        
        yield "All project files saved successfully!"
        return output_dir
    
    except Exception as e:
        yield f"An error occurred: {e}"
        return None