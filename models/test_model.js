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
    getTestByCategory(arr){
        return new Promise( (resolve, reject) => {
            db(TABLE).whereIn('category.id',arr)
            .join('tag','tests.id_tag','tag.id')
            .join('category','tag.id_category','category.id')
            .select('tests.*','category.name as category','tag.name as tag')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
}
module.exports = TestModel