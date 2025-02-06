# Using Playwright for API Testing

## Introduction
Not only can Playwright be used for web user interface testing, it can also be used for API testing too! No need to use a separate program to test!

(if you needs to see examples of tests in a particular language, take a look at one of my other GitHub repositories [Playwright Starter Kit](https://github.com/andyc010/pw_starter_kit)

I have created example tests using sample APIs at:
- https://icanhazdadjoke.com/api (found from https://github.com/public-apis/public-apis)
- https://restful-booker.herokuapp.com/ (found from https://github.com/BMayhew/awesome-sites-to-test-on?tab=readme-ov-file)

## Running the tests
1. If it is not already installed, install Node.js on your computer.
2. Clone this repository (or download the files).
3. Use a CLI (such as Terminal for Linux or Mac), and inside the folder, type the following command:
  `npm init playwright@latest`
4. To run the tests, type the following command:
  `npx playwright test`
