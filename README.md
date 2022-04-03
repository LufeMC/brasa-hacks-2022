# Hackathon - Brasa Hacks 2022: our solution

## Team 4: Brado Retumbante
- Felipe Bandeira Ramos
- Luis Fernando Monteiro Cerqueira
- Nicole Batista Dantas
- Gabriel Bio Guerra
- Pedro Guerra Lourenço

## About the solution
We've develop an universal authentication system that uses the Blockchain to create the digital identification of each user. 

Here, the user will have total control of their data and who can access them. Some information is public on the Blockchain, but others can be protected by encryption (only the data owner can read them).

## Project Setup
Requirements:
- Some modules, described inside our `package.json`
- Node.js v16.14.2
- Ganache v2.5.4 (download at https://trufflesuite.com/ganache/index.html)
- Truffle Suite (download at https://trufflesuite.com/)

## Running the project

### Backend
1. Inside the project's folder, run `npm install` or `npm i` to install all node_modules required to run the project
2. Install Ganache and Truffle using the links provided above
3. Ganache should be running on port `7545`. If it's running at another port, you can change the `truffle-config.js`
4. Open Ganache and create a new environment, passing the `truffle-config.js` to the  "TRUFFLE PROJECTS".
4. Run `yarn migrate`
5. Run `yarn start` and you're good to go!


#### Testing the backend (unit test)
1. If not already done, compíle contracts with `truffle compile`
2. Run `yarn test`

### Frontend
// TODO
