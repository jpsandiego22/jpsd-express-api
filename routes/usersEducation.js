const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// VALIDATION MODULE
const { insertUsersEducationValidation, updateUsersEducationValidation } = require('../validation/usersEducationValidation')

// QUERIES TO DB MODULE
const { insertUsersEducation, updateUsersEducation, deleteUsersEducation} = require('../queries/usersEducationQueries')

// INSERT & UPDATE MODULE
router.route("/submit")
.post(jsonParser, insertUsersEducationValidation, insertUsersEducation)
.put(jsonParser, updateUsersEducationValidation, updateUsersEducation)
.delete(jsonParser, deleteUsersEducation)


module.exports = router ;