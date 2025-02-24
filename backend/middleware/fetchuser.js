const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DiPAK!123ghuGE';

const fetchuser = (req , res , next)=>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(400).send({error:"Please authenticate using correct token."});
    }
    try{
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (err){
        return res.status(400).send({error:"Please authenticate using correct token."});
    }
}

module.exports = fetchuser;