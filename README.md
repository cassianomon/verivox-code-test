# Verivox Code Test

This code was done for the Front-end Developer job opportunity at Verivox.

It is a Node.js REST endpoint with Nunjucks views that allow the user to compare which electricity package is better based in a annual cost in kWh.

### Start the project

- Clone this repository:
  `git@github.com:cassianomon/verivox-code-test.git`
- Enter the project folder:
  `cd verivox-code-test`
- Install the dependencies:
  `npm install` or `yarn`
- Start the localhost server:
  `npm start` or `yarn start`
- Open on your browser:
  `localhost:8000`

- To run tests:
  `npm run test` or `yarn test`

- To deploy:
  `npm run deploy` or `yarn deploy`

### Functionalities

When you start the project it gonna render a page that lists two products. In the input field above the product list you can insert the annual kWh and after you click the button it gonna calculate the comparision between the two products and display the annual cost of each one, also it gonna display which is the cheapest with a message and a green alert.

You can check detailed comments in the code.

The project was deployed with Now.sh:
[https://verivox-code-test.cassianomontanari.now.sh](https://verivox-code-test.cassianomontanari.now.sh)

### What was used to build this project

- [Express](http://expressjs.com/): It is a fast and minimalist web framework for serving web applications written in Node.js.
- [Nunjucks](https://github.com/mozilla/nunjucks#readme): Templating engine for Javascript to render views with HTML.
- [Jest](https://jestjs.io/): Javascript testing framework.
