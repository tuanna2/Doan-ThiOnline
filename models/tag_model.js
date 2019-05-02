const db = require('./dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'tag';
class TagModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getByCategory(id){
        return new Promise( (resolve, reject) => {
            db(TABLE).where({id_category:id}).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })   
    }
}
module.exports = TagModel