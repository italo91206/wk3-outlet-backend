import { Router } from 'express';
import service from '../../app/cores/corService';

class CoresRouter {
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/cores', async (req, res) => {
			let dados;
			try {
				dados = await service.handleVerCores();
				res.status(200).json({ success: true, data: dados});
			}
			catch (err) {
				res.status(200).json({ success: false, message: err.message })
			}
		});

		this.router.get('/cor', async (req, res) => {
			let dados;
			try {
				dados = await service.handleGetCor(req);
				res.status(200).json({ success: true, data: dados});
			}
			catch (err) {
				res.status(200).json({ success: false, message: err.message });
			}
		});

		this.router.delete('/deletar', async (req, res) => {
			let dados;
			try {
				dados = await service.handleDeletarCor(req);
				res.status(200).json({ success: true, data: dados });
			}
			catch (err) {
				res.status(200).json({ success: false, message: err.message });
			}
		});

		this.router.post('/novo', async (req, res) => {
			let dados;
			try {
				dados = await service.handleNovaCor(req);
				res.status(200).json({ success: true, data: dados });
			}
			catch (err) {
				res.status(200).json({ success: false, message: err.message });
			}
		});

		this.router.put('/atualizar', async (req, res) => {
			let dados;
			try {
				dados = await service.handleAtualizarCor(req);
				res.status(200).json({ success: true, data: dados });
			}
			catch (err) {
				res.status(200).json({ success: false, message: err.message });
			}
		})
	}
}

export default new CoresRouter().router;