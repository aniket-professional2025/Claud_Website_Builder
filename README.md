# Claud_Website_Builder
This project revolves around cloning the **Lovable.dev** project to some extent using Claud Sonnet 3.7 provided by Anthropic team. This project generates react &amp; tail wind css codes in .jsx format with proper structure

### Overall Process:
This project is created by using the Claud's Sonnet 3.7 model using python. Different prompts are tested as system prompts and then they are used to generate the complete project structure with the codes. The codes and the rendered website both are shown inside the streamlit web interface. 

### Handling React Files
In general, no handle react & tailwind css files (in .jsx and .css and .html, .js), node modules are required. Thats why we need to go to the directory where the project folders are generated and then run the following commands:

``` bash 
  npm i
  npm run dev
```

**Note:** This code will only run succesfully if the project folder contains the package.json file. So, make sure the code generates the package.json file. 

### Handling Website Rendering inside Streamlit
This project uses Vite to render the react + tailwind css codes. So, when the above codes (npm codes) are run in the terminal, it creates a localhost:5173 where we can see the rendered website. Now, streamlit itself runs on localhost:8501. So, there is a issue in rendereing the website inside streamlit UI. The solution is **Ngrok**. Using the desktop application of Ngrok and using their token, we can generate a link from the localhost. The codes are:

```bash
ngrok -v # To check version
ngrok config add-authtoken <token> # To add your token
ngrok http 5173 # To get a link from the localhost
```
Once, we run the last code, the localhost:5173 will open in a link like <https://aedd6b2cbcfe.ngrok-free.app> and this link can be put as the entry point in the streamlit app.
