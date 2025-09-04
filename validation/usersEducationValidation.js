

const insertUsersEducationValidation = async(req,res,next)=>{
    const {users_id, course, batch_year, institution} = req.body


    try {
        if( !users_id || !course || !batch_year || !institution ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
       
    } catch (err) {
        next(err);
    }

    
    next();
}

const updateUsersEducationValidation = async(req,res,next)=>{
    const { id, users_id, course, batch_year, institution } = req.body;
    try {
        if( !id || !users_id || !course || !batch_year || !institution ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
        
    } catch (err) {
        next(err);
    }
    
    next();
}

module.exports = { insertUsersEducationValidation, updateUsersEducationValidation };