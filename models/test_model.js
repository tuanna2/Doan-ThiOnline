const db = require('./dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'tests';
class TestModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getTestByCategory(arr){
        return new Promise( (resolve, reject) => {
            db('tests').where('status', 1).whereIn('category.id', arr)
            .join('tag', 'tests.id_tag','tag.id')
            .join('users','tests.id_parent','users.id')
            .join('category','tag.id_category','category.id')
            .leftJoin('questions','questions.id_test','tests.id')
            .leftJoin('history','history.id_test','tests.id')
            .select('tests.*','users.username as parent','users.avatar as avatar','tag.name as tag',db.raw('count(DISTINCT questions.id) as ??, count(DISTINCT history.id) as ??',['question','access']))
            .groupBy('id')
            .then( res => resolve(handingData(res)))
            .catch( err => reject(err));
        })
    }
    getTestInfo(data){
        return new Promise( (resolve,reject) => {
            db('tests').where(data)
            .join('tag','tests.id_tag','tag.id')
            .join('users','tests.id_parent','users.id')
            .join('category','tag.id_category','category.id')
            .leftJoin('saved','tests.id','saved.id_test')
            .leftJoin('questions','tests.id','questions.id_test')
            .leftJoin('history','tests.id','history.id_test')
            .select('tests.*','category.id as category','users.username as parent','users.avatar as avatar','tag.name as tag',db.raw('count(DISTINCT questions.id) as ??, count(DISTINCT history.id) as ??',['question','access']))
            .groupBy('tests.id')
            .then( res => resolve(handingData(res)))
            .catch( err => reject(err));
        })
    }
    search(value){
        return new Promise( (resolve,reject) => {
            db('tests').where('tests.name','like',`%${value}%`)
            .join('tag','tests.id_tag','tag.id')
            .join('users','tests.id_parent','users.id')
            .join('category','tag.id_category','category.id')
            .leftJoin('saved','tests.id','saved.id_test')
            .leftJoin('questions','tests.id','questions.id_test')
            .leftJoin('history','tests.id','history.id_test')
            .select('tests.*','category.id as category','users.username as parent','users.avatar as avatar','tag.name as tag',db.raw('count(DISTINCT questions.id) as ??, count(DISTINCT history.id) as ??',['question','access']))
            .groupBy('tests.id')
            .then( res => resolve(handingData(res)))
            .catch( err => reject(err));
        })
    }
}
function handingData(res){
    res.forEach(e => {
        if(e.id_parent == 1){
            e.question = e.store.split(",").length;
        }
    });
    return res;
}
module.exports = TestModel