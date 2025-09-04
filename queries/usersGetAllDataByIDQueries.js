const db = require('../db');
const getquery = "Select " + 
                    "U.id,UB.bio_name,UB.introduction, UB.github, UB.linkedin, UB.facebook, " +
                    "Concat(fname,' ', mname, ' ', lname, ' ', suffix), email, contact_no,location, portfolio_link, position," +
                    "UE.course, UE.batch_year,UE.institution, UE.course_highlights, " +
                    " '' as skill_application, " +
                    " '' as career_history, " +
                    " '' as users_portfolio " +
                "from users as U " +
                "Left Join users_bio as UB " +
                    "on UB.users_id = U.id " +
                "Left Join users_education as UE " +
                    "on UE.users_id = U.id " +
                "where U.id = $1";

const getDataByID = async(req,res)=>{
    const id =  Number(req.params.id);
    try{
        
        await db.query(getquery,[id],(err,result,fields) => {
            if (err) throw res.json({
                status:'error',
                data: err
            });
            if(!result.rows.length) return res.status('400').json({status:'Error',message: 'No Record Found.'});

            const get_skill_application = "Select id, type, description, expertise from skill_application where users_id = $1";
            db.query(get_skill_application,[id],(err,results_get_skill_application,fields) => {
                if (err) throw res.json({
                    status:'error',
                    data: err
                });

                result.rows[0].skill_application = results_get_skill_application.rows

                const get_career_history = "Select id, job_title, company_name, TO_CHAR(date_started, 'YYYY-MM-DD') as date_started, TO_CHAR(date_ended, 'YYYY-MM-DD') as date_ended, description from career_history where users_id = $1";
                db.query(get_career_history,[id],(err1,results_get_career_history,fields) => {
                    if (err1) throw res.json({
                        status:'error',
                        data: err1
                    });
    
                    result.rows[0].career_history = results_get_career_history.rows

                    const get_users_portfolio = "SELECT id, image_url, portfolio_link, project_title, description FROM users_portfolio where users_id = $1";
                    db.query(get_users_portfolio,[id],(err2,results_get_users_portfolio,fields) => {
                        if (err2) throw res.json({
                            status:'error',
                            data: err2
                        });
        
                        result.rows[0].users_portfolio = results_get_users_portfolio.rows
        
                        res.json({
                            status:'success',
                            data: result.rows
                        });
        
                    });
                });
            });
        });
    } catch (error) {
        console.log(error)
          res.json({
                            status:'error1',
                            data: error
                        });
    }
}

module.exports = { getDataByID }