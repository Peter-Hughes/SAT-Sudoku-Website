# Sudoku Website 

A website to help explain the satisfiability (SAT) problem using Sudoku as an example. Website offers full Sudoku 
functionality; users can create new puzzles of different dimensions, play the puzzle with complete validation, receive 
hints and check the progress of the puzzle. Additionally the puzzle can be solved using a range of SAT solver, the 
SAT model used to solve the puzzle and the solution returned from the solver are viewable in the website.  

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites
**You will need to have Node >= 6 on your local development machine and [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) installed (if on mac).**
A local version of the [SAT-solver-service](https://github.com/Peter-Hughes/SAT-Solver-Service) will be required to run 
locally to have the full functionality of the website (solve puzzle, create new puzzle and receive hint).

### Installing

Install it once globally:

Pull down the project and install the node modules using: ```npm install```

Allow all the node modules to install. Once the node modules have installed, start the app using: ```npm start```

http://localhost:3000/ will be opened automatically.

>You can run ```npm run fast-start``` script, it will install all npm packages, run dev build, server and open http://localhost:3000/

## Running The Tests

You can run `npm run test` or `npm test` script, it will run all the tests in the project. 
This project uses [Jest](https://jestjs.io/) as it's testing frame work. 

The test files can be found under the test folder. The types of tests are split into 2 folders, `reducers` which test
the react redux reducer functionality and `utils` which test the javascript implementations. Utils tested the 
implementation of the solver logic, Sudoku rules and Sudoku logic.

```
sudoku-website
└── src
    └── test
        ├── reducers
        └── utils
```

### Jest Commands 

* `a` - Run all tests
* `f` - Run failing tests only 
* `q` - To quit 
* `p` - Filter by filename regex pattern
* `t` - Filter by test name regex pattern 

## Built With

* [React JS](https://reactjs.org/) - The web framework used
* [npm](https://www.npmjs.com/) - The package manager
* [Redux](https://react-redux.js.org/) - Library for predictable state management
* [Jest](https://jestjs.io/) - The testing frame work 

## Authors

* **Peter Hughes**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgements
* **Ivor Spence**

![logo](public/image/logo.png)

## Minutes

Meetings minutes are under the `meetingMinutes folder`