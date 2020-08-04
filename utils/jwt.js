const jwt = require('jsonwebtoken');
const secret = "secret";

module.exports = {
    sign(data){
        return jwt.sign(data, secret,  {
            algorithm: 'HS256', expiresIn: '30d',
        })
    },
    checkToken(token) {
        let data;
        try{
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            data = jwt.verify(token, secret);
        } catch(e){
            return false;
        }
        return data;
    }
}