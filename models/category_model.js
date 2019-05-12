const BaseModel = require('./base_model');
const db = require('./dbconnect');
const TABLE = 'category';
class CategoryModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getIn(arr){
        return new Promise( (resolve, reject) => {
            db(TABLE).whereIn('id',arr).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
}
module.exports = CategoryModel