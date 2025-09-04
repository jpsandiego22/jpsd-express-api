const db = require('../db');


const insertQueriesUsersBio = "INSERT INTO users_bio " +
    "(users_id, bio_name, introduction, github, linkedin, facebook) " +
	"VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ";

const updateQueriesUsersBio = "UPDATE users_bio " +
	"SET users_id=$2, bio_name=$3, introduction=$4, github=$5, linkedin=$6, facebook=$7 " +
	"WHERE id = $1 RETURNING *";

const deleteQueriesUsersBio = "DELETE FROM users_bio WHERE id = $1";


const insertUsersBio = async(req,res)=>{
  
    const {users_id, bio_name, introduction, github, linkedin, facebook} = req.body
    try {
         await db.query(insertQueriesUsersBio,[users_id, bio_name, introduction, github, linkedin, facebook],(err,result) => {
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

const updateUsersBio = async(req,res)=>{
    const { id, users_id, bio_name, introduction, github, linkedin, facebook} = req.body
    try {
         await db.query(updateQueriesUsersBio,[id, users_id, bio_name, introduction, github, linkedin, facebook],(err,result) => {
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

const deleteUsersBio = async(req,res)=>{
    const { id } = req.body

    try {
         await db.query(deleteQueriesUsersBio,[id],(err,result) => {
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

module.exports = { insertUsersBio, updateUsersBio, deleteUsersBio };