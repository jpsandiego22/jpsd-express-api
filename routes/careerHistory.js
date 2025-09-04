const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// VALIDATION MODULE
const {insertCareerHistoryValidation, updateCareerHistoryValidation} = require('../validation/careerHistoryValidation')

// QUERIES TO DB MODULE
const {insertCareerHistory, updateCareerHistory, deleteCareerHistory} = require('../queries/careerHistoryQueries')

// INSERT & UPDATE MODULE
router.route("/submit")
.post(jsonParser, insertCareerHistoryValidation, insertCareerHistory)
.put(jsonParser, updateCareerHistoryValidation, updateCareerHistory)
.delete(jsonParser, deleteCareerHistory)


module.exports = router;