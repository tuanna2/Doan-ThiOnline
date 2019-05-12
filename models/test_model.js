const db = require('./dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'tests';
class TestModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getTestByCategory(arr){
        return new Promise( (resolve, reject) => {
            db('tests').whereIn('category.id',arr)
            .join('tag','tests.id_tag','tag.id')
            .join('users','tests.id_parent','users.id')
            .join('category','tag.id_category','category.id')
            .leftJoin('questions','tests.id','questions.id_test')
            .leftJoin('history','tests.id','history.id_test')
            .select('tests.*','users.username as parent','users.avatar as avatar','tag.name as tag',db.raw('count(questions.id) as ??,count(history.id) as ??',['question','access']))
            .groupBy('tests.id')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    getTestInfo(data){
        return new Promise( (resolve,reject) => {
            db('tests').where(data)
            .join('tag','tests.id_tag','tag.id')
            .join('users','tests.id_parent','users.id')
            .leftJoin('questions','tests.id','questions.id_test')
            .leftJoin('history','tests.id','history.id_test')
            .select('tests.*','users.username as parent','users.avatar as avatar','tag.name as tag',db.raw('count(questions.id) as ??,count(history.id) as ??',['question','access']))
            .groupBy('tests.id')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
}
module.exports = TestModel