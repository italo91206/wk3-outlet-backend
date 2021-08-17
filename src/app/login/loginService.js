import model from './loginModel';
import { parseObjectToCamelCase } from '../../utils/utils';

export default {
    async handleLogin(req){
<<<<<<< HEAD
        const perfil = await model.selectPerfil(req);
=======
        const perfil = await model.retrieveUserData(req);
        // return parseObjectToCamelCase(perfil);
>>>>>>> development
        return perfil;
    }
}