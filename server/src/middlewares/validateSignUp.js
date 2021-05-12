import UserModel from '../resources/user/user.model'

export const validateSignUp = async (req, res, next) => {
    const {username, email} = req.body
    await UserModel.countDocuments({username: username}, async (err, count)=>{
        if(count == 0){
            await UserModel.countDocuments({email: email},(err, count)=>{
                if(count > 0){
                    return res.status(409).send('Email already exists!')
                } 
                 next()
            })
        } else {
            next()
        }
    })
    
}
