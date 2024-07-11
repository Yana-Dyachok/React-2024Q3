# React project setup. Class components. Error boundary.

## Technical Requirements

1. Create a separate branch for this task. Branch name: "class-components".
2. Language Requirement
   - Use **TypeScript** for the project.
3. Project Setup
   - Initialize the project using [Vite](https://vitejs.dev/guide/) with the [_react-ts_ template](https://vite.new/react-ts).
4. Code Quality Tools
   1. ESLint
      - Set up ESLint to throw errors if TypeScript's _any_ type is used.
      - Set up [eslint-plugin-react-compiler](https://www.npmjs.com/package/eslint-plugin-react-compiler) to throw errors if React rules are violated.
   2. Prettier
      - Integrate Prettier for code formatting.
   3. Husky
      - Add Husky and configure it to run linting on pre-commit.
   4. package.json commands
      - Add the following npm scripts:
        - `lint`: For running the lint command.
        - `format:fix`: For running Prettier's --write command.
5. Pick a RESTfull api which supports search and pagination (pagination might be reffered as _offset_ and _limit_ params). E.g. https://pokeapi.co/, for Star Wars fans https://swapi.dev/api, for Star Trek fans https://stapi.co/api-documentation (OpenApi spec can be checked here https://editor.swagger.io/?url=https://stapi.co/api/v1/rest/common/download/stapi.yaml), or you can select another one complying with the requirements.

## Application Requirements

1. Create a page comprised of 2 horizontal sections (a smaller top one, and a bigger bottom one).
2. On the top section put _Search_ input and the "Search" button. _Search_ component should look for a previously saved search term in the local storage (LS), if there isn't any - leave the input empty.
3. Bottom section should be used for displaying search results (name and a small description).
4. By default application makes a call to the selected api to get the list of the items with the search term from the input (only first page). If the input is empty make a call to get all the items.
5. When user modifies the _Search_ input and clicks on "Search" button, application makes a call to an api with the newly provided search term (search term should not have any trailing spaces, process the input) to get the results (only first page).
6. The provided search term should be saved to the LS, if the value exists overwrite it.
7. Wrap application to an error boundary to catch errors. Report an error to a console and show fallback UI (use respective methods for this). Create a button which will throw an error on click to test the functionality.

**Use class components to get access to lifecycle events or state. Using hooks is forbidden at this stage. Patience, it won't last long.**

All logical parts should be set into separate components.