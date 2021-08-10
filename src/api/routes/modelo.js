import { Router } from 'express';
import service from '../../app/modelo/modeloService';

class ModeloRouter {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/modelos', async (req, res) => {
            let dados;
            try {
                dados = await service.handleVerModelos();
                res.status(200).json(dados);
            }
            catch (err) {
                res.status(400).json({ success: false, error: err.message })
            }
        });

        this.router.delete('/deleteModelo', async(req, res) => {
            let dados;
            try {
                dados = await service.handleDeleteModelo(req);
                res.status(200).json(dados);
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }
        });

        this.router.put('/editarModelo', async(req, res) => {
            let dados;
            try{
                dados = await service.handleEditarModelo(req);
                res.status(200).json(dados);
            }
            catch(err){
                res.status(400).json({ success: false, error: err.message });
            }
        });

        this.router.post('/novoModelo', async(req, res) => {
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

export default new ModeloRouter().router;