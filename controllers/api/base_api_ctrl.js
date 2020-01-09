class BaseApiController {
    constructor(model) {
        this.model = new model();
    }
    async add(req,res){
        try{
            const rs = await this.model.add(req.body);
            res.json({ message: 'success', data: rs});
        } catch(e){
            console.log(e);
            res.status(500).send(e);
        }
    }
    async get(req,res){
        const rs = await this.model.get({id:req.params.id});
        (typeof rs !== "undefined") ?
            res.json({ message: 'success', data: [].concat(rs)}) :
            res.json({ message: 'success', data: []});
    }
    async getAll(req,res){
        const rs = await this.model.getAll();
        (typeof rs !== "undefined") ?
            res.json({ message: 'success', data: [].concat(rs)}) :
            res.json({ message: 'success', data: []});
    }
    async delete(req,res){
        const rs = await this.model.del(req.params.id);
        res.json({ message: 'success', data: rs});
    }
    async update(req,res){
        const rs = await this.model.update(req.body);
        res.json({ message: 'success', data: rs});
    }
}
module.exports = BaseApiController;