const express = require("express")
const app = express();
const usedTokens = new Set();
const router = express.Router()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// VALIDATION MODULE
const { insertSkillApplicationValidation, updateSkillApplicationValidation } = require('../validation/skillapplicationValidation')

// QUERIES TO DB MODULE
const { insertSkillApplication, updateSkillApplication, deleteSkillApplication} = require('../queries/skillapplicationQueries')

// INSERT & UPDATE MODULE
router.route("/submit")
.post(jsonParser, insertSkillApplicationValidation, insertSkillApplication)
.put(jsonParser, updateSkillApplicationValidation, updateSkillApplication)
.delete(jsonParser, deleteSkillApplication)


module.exports = router ;