import { Router } from 'express';
import service from '../../app/produto/produtoService';

class ProdutoRouter{
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/produtos', async(req, res) => {
            let dados;
            try{
                dados = await service.handleVerProdutos();
                res.status(200).json({ success: true, dados: dados});
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message })
            }
        })
    }
}

export default new ProdutoRouter().router;