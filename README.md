# React forms.

## Technical Requirements

1. Create a separate branch for this task. Branch name: "forms". For this task you will need to create a new application.
2. Language Requirement
   - Use **TypeScript** for the project.
3. Project Setup
   - Initialize the project using [Vite](https://vitejs.dev/guide/) with the [_react-ts_ template](https://vite.new/react-ts).
4. Code Quality Tools
   1. ESLint
      - Set up ESLint to throw errors if TypeScript's _any_ type is used.
   2. Prettier
      - Integrate Prettier for code formatting.
   3. Husky
      - Add Husky and configure it to run linting on pre-commit.
   4. package.json commands
      - Add the following npm scripts:
        - `lint`: For running the lint command.
        - `format:fix`: For running Prettier's --write command.
5. Add **React Hook Form**, **Yup**, **Redux Toolkit** and **React Router** to the application.

## Application Requirements

1. Routing. There will be 3 routes:
   - Main, should have links to other 2 routes
   - Route for the form created using uncontrolled components approach
   - Route for the similar form, but created using **React Hook Form**
2. Redux. Use redux to store the data provided by both approaches on the Main route. You can use tiles to display data taken from each form.
3. Forms
   Both forms will collect the same data:
   - name (validate for first uppercased letter)
   - age (should be number, no negative values)
   - email (validate for email)
   - 2 passwords (should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
   - gender (you can use radio buttons or select control)
   - accept Terms and Conditions agreement (T&C, can be a checkbox)
   - input control to upload picture (validate size and extension, allow png jpeg, save in redux store as base64)
   - autocomplete control to select country (all countries should be stored in the Redux store)
     Form should contain labels, which should be connected with inputs (look at **htmlFor**)
4. Validation
   Implement validation according to the inputs description from p. 3. Use **Yup** for validation. Show errors either above each component, or below (but stick with one approach everywhere). Block submitting the form before all the errors are fixed (disable submit button). Good UX assumes that there are no "jumps" when showing errors.
   - Uncontrolled components should implement validation on submit
   - Approach with **React Hook Form** should implement live validation
5. After submitting the form
   On successful form submission redirect user to the main route with all the previously entered data. Make an indication for a newly entered data on the main route (e.g. show border in a different color for a few seconds, or a different background color)