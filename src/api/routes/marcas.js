import { Router } from 'express';
import service from '../../app/marca/marcaService';

class MarcaRouter{
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/marcas', async(req, res) => {
            let dados;
            try {
                dados = await service.handleVerMarcas();
                res.status(200).json(dados);
            }
            catch (err) {
                res.status(400).json({ success: false, error: err.message })
            }
        });

        this.router.delete('/deleteMarca', async(req, res) => {
            let dados;
            try {
                dados = await service.handleDeleteMarca(req);
                res.status(200).json(dados);
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }
        });

        this.router.put('/editarMarca', async(req, res)=>{
            let dados;
            try{
                dados = await service.handleEditarMarca(req);
                res.status(200).json(dados);
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }
        });

        this.router.post('/novaMarca', async(req, res) =>{
            let dados;
            try{
                dados = await service.handleInsert(req);
                res.status(200).json(dados);
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }
        })
    }
}

export default new MarcaRouter().router;