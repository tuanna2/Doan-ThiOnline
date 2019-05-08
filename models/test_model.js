const db = require('./dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'tests';
class TestModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getTestCreating(param1,param2){
        return new Promise( (resolve, reject) => {
            db(TABLE).where(param1).orWhere(param2).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
}
module.exports = TestModel