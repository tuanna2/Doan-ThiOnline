const db = require('./dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'store';
class CategoryModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getStore(){
        return new Promise( (resolve, reject) => {
            db('store')
            .join('tag','store.tag_id','tag.id')
            .join('category','tag.id_category','category.id')
            .select('store.*','category.id as category','tag.name as tag')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })   
    }
    getOne(id){
        return new Promise( (resolve, reject) => {
            db('store').where('store.id', id)
            .join('tag','store.tag_id','tag.id')
            .select('store.*','tag.id_category as category')
            .then( res => resolve(res[0]))
            .catch( err => reject(err));
        })
    }
    getRandom(level, tag , limit){
        return new Promise( (resolve, reject) => {
            db('store').where({tag_id: tag, level})
            .select('id')
            .orderByRaw('RAND()')
            .limit(limit)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
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