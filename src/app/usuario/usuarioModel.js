const connection = require('../../database/connection');
// const bcrypt = require('bcryptjs');

/** Vai encriptografar a senha, gerando valores aleatorios */
// const encryptPassword = password => {
//   const salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// };

export default {
  async emailAlreadyInUse(term, id){
    const sliced_term = term.slice(1)
    const capitalized_term = `${term[0].toUpperCase()}${sliced_term.toLowerCase()}`
    const email = await connection('perfis')
      .where('email', 'like', term.toLowerCase())
      .orWhere('email', 'like', term.toUpperCase())
      .orWhere('email', 'like', capitalized_term)
      .first();
    
    if(email == null) 
      return null
    else 
      return email.id == id ? null : email;
  },

  async listarUsuarios(){
    const usuarios = await connection('perfis').select('*');
    return usuarios;
  },

  async listarUsuario(req){
    const { id } = req.query;
    const usuario = await connection('perfis')
      .select('*')
      .where('id', id)
      .first();

    if(!usuario)
      throw { message: 'Este usuário não existe.' };
    else
      return usuario;
  },

  async novoUsuario(req){
    const { usuario } = req.body;
    const email_em_uso = await this.emailAlreadyInUse(usuario.email, null)
    

    if(email_em_uso)  
      throw { message: 'Já existe um usuário com este e-mail.' };
    else if(!usuario.email)
      throw  { message: 'Não foi inserido um e-mail válido' };
    else if(!usuario.password)
      throw { message: 'Não foi inserido uma senha válida' };
    else if(!usuario.nome)
      throw { message: 'Não foi inserido um nome válido.' };
    else if(!usuario.sobrenome)
      throw { message: 'Não foi inserido um sobrenome válido' };
    else{
      // force is_enabled
      usuario.is_enabled = true;
      const novo = await connection('perfis')
        .insert(usuario, 'id');
      return novo;
    }
  },

  async deletarUsuario(req){
    const { id } = req.query;

    const is_admin = await connection('perfis')
      .where('id', id)
      .select('isAdmin')
      .first();
    
    if(is_admin.isAdmin){
      const count = await connection('perfis')
        .where('isAdmin', true)
        .select('id');
      if(count.length == 1){
        throw { message: 'Não pode apagar a única conta administradora do sistema.' };
      }
    }

    const vendas_usuario = await connection('vendas')
      .where('usuario_id', id)
    
    if(vendas_usuario.length > 0)
      throw { message: 'Não é possível remover usuário com compras efetuadas'}
    
    const deletar = await connection('perfis')
      .where('id', id)
      .del('id');

    return deletar;
  },

  async atualizarUsuario(req){
    const { usuario } = req.body;

    const already_in_use = await this.emailAlreadyInUse(usuario.email, usuario.id)
    
    if(already_in_use)
      throw { message: 'Já existe uma conta com este e-mail.' };
    else {
      const atualizar = await connection('perfis')
        .where('id', usuario.id)
        .update(usuario, 'id');
      
      return atualizar;
    }
  }
};
