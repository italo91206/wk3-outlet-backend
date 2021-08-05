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
        });
        
        this.router.get('/produto', async(req, res) => {
            let dados;
            try{
                dados = await service.handleTrazerProduto(req);
                res.status(200).json({ dados: dados })
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }
        });

        this.router.post('/novo', async (req, res) => {
            let dados;
            try {
                dados = await service.handleNovoProduto(req);
                res.status(200).json({ dados: dados });
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }

        });

        this.router.post('/deletar', async (req, res) => {
            let dados;
            try {
                dados = await service.handleDeletarProduto(req);
                res.status(200).json({ dados: dados });
            }
            catch(err){
                res.status(400).json({ success: false, message: err.message });
            }
        });

        this.router.put('/atualizar', async (req, res) => {
            let dados;
            try {
                dados = await service.atualizarProduto(req);
                res.status(200).json({ dados: dados })
            }
            catch(err){
                res.status(400).json({ success: false, message: err.message });
            }
        })
    }
}

export default new ProdutoRouter().router;