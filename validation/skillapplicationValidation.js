

const insertSkillApplicationValidation = async(req,res,next)=>{
    const {users_id, type, description, expertise } = req.body

    try {
        if( !users_id || !type || !description || !expertise ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
       
    } catch (err) {
        next(err);
    }

    
    next();
}

const updateSkillApplicationValidation = async(req,res,next)=>{
    const { id, users_id, type, description, expertise } = req.body;
    try {
        if( !id || !users_id || !type || !description || !expertise ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
        
    } catch (err) {
        next(err);
    }
    
    next();
}

module.exports = { insertSkillApplicationValidation, updateSkillApplicationValidation };