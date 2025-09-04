const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// VALIDATION MODULE
const {usersUpdateValidation, usersInsertValidation, usersGetDataValidation} = require('../validation/usersValidation')

// QUERIES TO DB MODULE
const {getAllData, deleteDatabyID, insertUser, updateUser} = require('../queries/usersQueries')
const { getDataByID } = require('../queries/usersGetAllDataByIDQueries')


// GET ALL DATA
router.get("/getalldata",getAllData);

// INSERT & UPDATE MODULE
router.route("/submit")
.post(jsonParser, usersInsertValidation, insertUser)
.put(jsonParser, usersUpdateValidation, updateUser)


// GET SPECIFIC DATA & DELETE
router.route("/:id")
.post(jsonParser ,usersGetDataValidation, getDataByID)
.delete(jsonParser, usersGetDataValidation, deleteDatabyID)

module.exports = router;