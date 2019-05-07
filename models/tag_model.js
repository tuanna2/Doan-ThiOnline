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
}
module.exports = TagModel