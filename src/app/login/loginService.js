import model from './loginModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
    async handleLogin(req){
        const perfil = await model.selectPerfil(req);
        return perfil;
    }
}