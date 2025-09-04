const db = require('../db');


const insertQueriesUsersEducation = "INSERT INTO users_education " +
    "(users_id, course, batch_year, institution, course_highlights) " +
	"VALUES ($1, $2, $3, $4, $5) RETURNING * ";

const updateQueriesUsersEducation = "UPDATE users_education " +
	"SET users_id=$2, course=$3, batch_year=$4, institution=$5, course_highlights=$6 " +
	"WHERE id = $1 RETURNING *";

const deleteQueriesUsersEducation = "DELETE FROM users_education WHERE id = $1";


const insertUsersEducation = async(req,res)=>{
  
    const {users_id, course, batch_year, institution, course_highlights} = req.body
    try {
         await db.query(insertQueriesUsersEducation,[users_id, course, batch_year, institution, course_highlights],(err,result) => {
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

const updateUsersEducation = async(req,res)=>{
    const { id, users_id, course, batch_year, institution, course_highlights} = req.body
    try {
         await db.query(updateQueriesUsersEducation,[id, users_id, course, batch_year, institution, course_highlights],(err,result) => {
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

const deleteUsersEducation = async(req,res)=>{
    const { id } = req.body

    try {
         await db.query(deleteQueriesUsersEducation,[id],(err,result) => {
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

module.exports = { insertUsersEducation, updateUsersEducation, deleteUsersEducation };