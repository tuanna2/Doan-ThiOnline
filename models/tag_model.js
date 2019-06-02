const db = require('./dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'tag';
class TagModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    getByCategory(id){
        return new Promise( (resolve, reject) => {
            db('tag').where({id_category:id})
            .join('category','tag.id_category','category.id')
            .select('tag.*','category.name as category')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })   
    }
    getAllTag(){
        return new Promise( (resolve, reject) => {
            db('tag').join('category','category.id','tag.id_category')
            .leftJoin('tests','tests.id_tag','tag.id')
            .select('tag.*','category.name as category',db.raw('count(DISTINCT tests.id) as ??',['countTest']))
            .groupBy('tag.id')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })  
    }
}
module.exports = TagModel