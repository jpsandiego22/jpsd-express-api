const db = require('../db');




const getAllData = async(req,res)=>{
    try{
        const query = 'SELECT * FROM users';
        await db.query(query,(err,result,fields) => {
            if (err) throw res.send(err);

            res.json({
                status:'success',
                data: result.rows
            });
        });
    } catch (error) {
        console.log(error)
    }
}



const deleteDatabyID = async(req,res)=>{
    const { id } = req.params;
    try{
        const query = 'Delete FROM users where id= $1';
        await db.query(query,[id],(err,result,fields) => {
            if (err) throw res.send(err);
            if(result.affectedRows != 0) return  res.json({
                status:'success',
                data: 'Record Deleted.'
            });
            else
            {
                return  res.status('401').json({
                    status:'Error',
                    data: 'No Record Found.'
                });
            }
           
        });
    } catch (error) {
        console.log(error)
    }
}

const insertUser = async(req,res)=>{
    const { lname, fname, mname, suffix, email, contact_no, location, portfolio_link} = req.body;
    try{
        const query = 'INSERT INTO users (lname, fname, mname, suffix, email, contact_no, location, portfolio_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        
        try {
            await db.query(query,[lname, fname, mname, suffix, email, contact_no, location, portfolio_link],(err,result) => {
                if (err) throw res.send(err);
                res.json({
                    status:'success',
                    message:'New Users successfully added.',
                    data: result.rows
                });
            });
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }

}

const updateUser = async(req,res)=>{
  
        const {lname, fname, mname, suffix, email, contact_no, location, portfolio_link, status,id} = req.body
        const query = 'UPDATE users SET lname=$1,fname=$2,mname=$3,suffix=$4,email=$5,contact_no=$6,location=$7, portfolio_link=$8, status=$9 WHERE id=$10 RETURNING *';
        try {
             await db.query(query,[lname, fname, mname, suffix, email, contact_no, location, portfolio_link, status,id],(err,result) => {
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

module.exports = {getAllData, deleteDatabyID, insertUser, updateUser};