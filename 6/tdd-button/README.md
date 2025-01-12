Try out test driven development by building a simple button component

For this exercise, you're given a set of failing unit tests.
Get the tests to pass by implementing the `Button` component!

You can clone this repo to run the test locally.

Happy coding!

Note: The test uses `jest` and React Testing Library

### Getting started

1. Clone this repo
2. Install the dependencies with `npm install`
3. Run the tests with `npm run test`
4. Implement your `Button` component inside the `src/Button.jsx` file; the tests will run again as you change the file

### What you'll learn

- rendering components in a test context using React Testing Library
- basic RTL methods - `getByRole`, `getByText`
- basic RTL assertions - `expect(...).toBeInTheDocument`, `expect(...).toHaveBeenCalled`
- troubleshooting tests with `screen.debug`
- mocking event handlers with jest mocks
- simulating user interactions using @testing-library/user-event v14
- async tests
