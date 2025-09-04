const db = require('../db');


const insertQueriesUsersPortfolio = "INSERT INTO users_portfolio " +
    " (users_id, image_url, portfolio_link, project_title, description) " +
	" VALUES ($1, $2, $3, $4, $5) RETURNING * ";

const updateQueriesUsersPortfolio = "UPDATE users_portfolio " +
	"SET users_id=$2, image_url=$3, portfolio_link=$4, project_title=$5, description=$6 " +
	"WHERE id = $1 RETURNING *";

const deleteQueriesUsersPortfolio = "DELETE FROM users_portfolio WHERE id = $1";


const insertUsersPortfolio = async(req,res)=>{
  
    const { users_id, image_url, portfolio_link, project_title, description } = req.body
    try {
         await db.query(insertQueriesUsersPortfolio,[users_id, image_url, portfolio_link, project_title, description],(err,result) => {
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

const updateUsersPortfolio = async(req,res)=>{
    const { id, users_id, image_url, portfolio_link, project_title, description} = req.body
    try {
         await db.query(updateQueriesUsersPortfolio,[id, users_id, image_url, portfolio_link, project_title, description],(err,result) => {
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

const deleteUsersPortfolio = async(req,res)=>{
    const { id } = req.body

    try {
         await db.query(deleteQueriesUsersPortfolio,[id],(err,result) => {
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

module.exports = { insertUsersPortfolio, updateUsersPortfolio, deleteUsersPortfolio };