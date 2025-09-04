function validateURL(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  }

const insertUsersBioValidation = async(req,res,next)=>{
    const {users_id, bio_name, introduction, github, linkedin, facebook} = req.body

    try {
        if( !users_id || !bio_name || !introduction ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
        
       if(github && !validateURL(github)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Github Link'
        })
        if(linkedin && !validateURL(linkedin)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid LinkedIn Link'
        })
        if(facebook && !validateURL(facebook)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Facebook Link'
        })
    } catch (err) {
        next(err);
    }

    
    next();
}

const updateUsersBioValidation = async(req,res,next)=>{
    const { id, users_id, bio_name, introduction, github, linkedin, facebook } = req.body;
    try {
        if( !id || !users_id || !bio_name || !introduction ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
        
    } catch (err) {
        next(err);
    }
    
    next();
}

module.exports = { insertUsersBioValidation, updateUsersBioValidation };