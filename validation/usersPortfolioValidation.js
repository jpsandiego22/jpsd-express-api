function validateURL(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  }

const insertUsersPortfolioValidation = async(req,res,next)=>{
    const {users_id, image_url, portfolio_link, project_title} = req.body

   

    try {
        if( !users_id || !project_title ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
        if(image_url && !validateURL(image_url)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Image Link'
        })
        if(portfolio_link && !validateURL(portfolio_link)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Image Link'
        })
    } catch (err) {
        next(err);
    }

    
    next();
}

const updateUsersPortfolioValidation = async(req,res,next)=>{
    const { id, users_id, image_url, portfolio_link, project_title, description } = req.body;
    try {
        if( !id || !users_id || !project_title || !description ) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Parameter'
        })
       
        if(image_url && !validateURL(image_url)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Image Link'
        })
        if(portfolio_link && !validateURL(portfolio_link)) throw res.status(400).json({
            status:'Error',
            message: 'Invalid Portfolio Link'
        })
    } catch (err) {
        next(err);
    }
    
    next();
}

module.exports = { insertUsersPortfolioValidation, updateUsersPortfolioValidation };