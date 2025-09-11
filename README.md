# Claud_Website_Builder
This project revolves around cloning the **Lovable.dev** project to some extent using Claud Sonnet 3.7 provided by Anthropic team. This project generates react &amp; tail wind css codes in .jsx format with proper structure

### Overall Process:
This project is created by using the Claud's Sonnet 3.7 model using python. Different prompts are tested as system prompts and then they are used to generate the complete project structure with the codes. The codes and the rendered website both are shown inside the streamlit web interface. 

### Handling React Files
In general, no handle react & tailwind css files (in .jsx and .css and .html, .js), node modules are required. Thats why we need to go to the directory where the project folders are generated and then run the following commands:

` bash 
  npm i
  npm run dev

  


