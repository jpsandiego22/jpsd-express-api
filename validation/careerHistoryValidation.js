function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());  // Returns true if the date is valid
  }

const insertCareerHistoryValidation = async(req,res,next)=>{
    const {users_id, job_title, company_name, date_started, date_ended, description} = req.body;

    try {
        if( !users_id || !job_title || !company_name || !date_started ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
         //VALIDATE EMAIL
         if(!isValidDate(date_started)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Date Started Format.'
        })
        if(!isValidDate(date_ended)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Date Ended Format.'
        })
    } catch (err) {
        next(err);
    }

    
    next();
}

const updateCareerHistoryValidation = async(req,res,next)=>{
    const { id, users_id, job_title, company_name, date_started, date_ended, description} = req.body;
    try {
        if( !id || !users_id || !job_title || !company_name || !date_started ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
         //VALIDATE EMAIL
         if(!isValidDate(date_started)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Date Started Format.'
        })
        if(!isValidDate(date_ended)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Date Ended Format.'
        })
    } catch (err) {
        next(err);
    }
    
    next();
}

module.exports = { insertCareerHistoryValidation, updateCareerHistoryValidation };