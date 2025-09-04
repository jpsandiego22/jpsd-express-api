const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// VALIDATION MODULE
const { insertUsersBioValidation, updateUsersBioValidation } = require('../validation/usersBioValidation')

// QUERIES TO DB MODULE
const { insertUsersBio, updateUsersBio, deleteUsersBio} = require('../queries/usersBioQueries')

// INSERT & UPDATE MODULE
router.route("/submit")
.post(jsonParser, insertUsersBioValidation, insertUsersBio)
.put(jsonParser, updateUsersBioValidation, updateUsersBio)
.delete(jsonParser, deleteUsersBio)


module.exports = router ;