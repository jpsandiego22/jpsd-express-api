const db = require('../db');


const insertQueriesSkillApplication = "INSERT INTO skill_application " +
    "( users_id, type, description, expertise) "+
	"VALUES ($1, $2, $3, $4) RETURNING *";

const updateQueriesSkillApplication = "UPDATE skill_application " +
	" SET users_id= $2, type=$3, description=$4, expertise=$5 "+
	" WHERE id = $1 RETURNING *";

const deleteQueriesSkillApplication = "DELETE FROM skill_application WHERE id = $1";


const insertSkillApplication = async(req,res)=>{
  
    const {users_id, type, description, expertise } = req.body
    try {
         await db.query(insertQueriesSkillApplication,[users_id, type, description, expertise],(err,result) => {
            if (err) throw res.send(err);
            res.json({
                status:'success',
                message:result.rows,
            });
        });
    } catch (error) {
        console.log(error)
    }

}

const updateSkillApplication = async(req,res)=>{
    const { id, users_id, type, description, expertise} = req.body
    try {
         await db.query(updateQueriesSkillApplication,[id, users_id, type, description, expertise],(err,result) => {
            if (err) throw res.send(err);
            res.json({
                status:'success',
                message:result.rows,
            });
        });
    } catch (error) {
        console.log(error)
    }
}

const deleteSkillApplication = async(req,res)=>{
    const { id } = req.body

    try {
         await db.query(deleteQueriesSkillApplication,[id],(err,result) => {
            if (err) throw res.send(err);
            res.json({
                status:'success',
                message:'Rows affected: ' + result.rowCount,
            });
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { insertSkillApplication, updateSkillApplication, deleteSkillApplication };