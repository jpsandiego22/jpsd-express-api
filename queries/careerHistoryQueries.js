const db = require('../db');


const insertQueriesCareerHistory = "INSERT INTO career_history " +
	"( users_id, job_title, company_name, date_started, date_ended, description ) " +
	"VALUES ($1, $2, $3 , $4, $5, $6) RETURNING *";

const updateQueriesCareerHistory = "UPDATE career_history "+
	"SET users_id=$2, job_title=$3, company_name=$4, date_started=$5, date_ended=$6, description=$7 " +
	"WHERE id = $1 RETURNING *";

const deleteQueriesCareerHistory = "DELETE FROM career_history WHERE id = $1";


const insertCareerHistory = async(req,res)=>{
  
    const {users_id, job_title, company_name, date_started, date_ended, description} = req.body
    try {
         await db.query(insertQueriesCareerHistory,[users_id, job_title, company_name, date_started, date_ended, description],(err,result) => {
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

const updateCareerHistory = async(req,res)=>{
    const { id, users_id, job_title, company_name, date_started, date_ended, description} = req.body
    try {
         await db.query(updateQueriesCareerHistory,[id, users_id, job_title, company_name, date_started, date_ended, description],(err,result) => {
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

const deleteCareerHistory = async(req,res)=>{
    const { id } = req.body

    try {
         await db.query(deleteQueriesCareerHistory,[id],(err,result) => {
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

module.exports = { insertCareerHistory, updateCareerHistory, deleteCareerHistory };