const jwt = require('jsonwebtoken');

exports.auth = ((req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    try {
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Token not provided' });
          }
        
          jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            req.userId = decoded.userId;
            req.email= decoded.email
            next();
          });
    } catch (error) {
        return res.status(500).json({message:error})
    }
})