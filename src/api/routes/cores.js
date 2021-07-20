import { Router } from 'express';
import service from '../../app/cores/corService';

class CoresRouter {
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/cores', async(req, res) => {
            let dados;
            try{
                dados = await service.handleVerCores();
                res.status(200).json(dados);
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message })
            }
        })
    }
}

export default new CoresRouter().router;