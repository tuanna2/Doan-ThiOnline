const db = require('./dbconnect');
class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    get(data) {
        return new Promise( (resolve, reject) => {
            db(this.tableName).where(data).select('*')
            .then( res => resolve(res[0]))
            .catch( err => reject(err));
        })
    }
    getMany(data){
        return new Promise( (resolve, reject) => {
            db(this.tableName).where(data).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    getAll() {
        return new Promise( (resolve, reject) => {
            db(this.tableName).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    add(data) {
        return new Promise( (resolve, reject) => {
            return db(this.tableName).insert(data)
            .then( res => resolve(res))
            .catch( err => reject(err) );
        })
    }
    update(data) {
        return new Promise( (resolve, reject) => {
            db(this.tableName).where({id: data.id}).update(data)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    del(id) {
        return new Promise( (resolve, reject) => {
            db(this.tableName).where({id: id}).del()
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    count() {
        return new Promise( (resolve, reject) => {
            db(this.tableName).count('id')
            .then( res => resolve(res[0]['count(`id`)']))
            .catch( err => reject(err));
        })
    }
}
module.exports = BaseModel