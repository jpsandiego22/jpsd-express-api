const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// VALIDATION MODULE
const { insertUsersPortfolioValidation, updateUsersPortfolioValidation } = require('../validation/usersPortfolioValidation')

// QUERIES TO DB MODULE
const { insertUsersPortfolio, updateUsersPortfolio, deleteUsersPortfolio} = require('../queries/usersPortfolioQueries')

// INSERT & UPDATE MODULE
router.route("/submit")
.post(jsonParser, insertUsersPortfolioValidation, insertUsersPortfolio)
.put(jsonParser, updateUsersPortfolioValidation, updateUsersPortfolio)
.delete(jsonParser, deleteUsersPortfolio)


module.exports = router ;