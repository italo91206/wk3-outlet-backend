exports.seed = function(knex){
    return knex('perfis')
        .del()
        .then(function(){
            return knex('perfis').insert([
                // default admin user
                {
                    email: 'admin@wk3outlet.com.br',
                    password: 'teste@123#',
                    nome: 'Administrador',
                    sobrenome: '- WK3 Outlet',
                    isAdmin: true,
                    isEmployee: false,
                    isCompany: false,
                    is_enabled: true
                },
                // default user
                {
                    email: 'funcionario@wk3outlet.com.br',
                    password: 'teste@123#',
                    nome: 'Funcionario',
                    sobrenome: '- WK3 Outlet',
                    isAdmin: false,
                    isEmployee: true,
                    isCompany: false,
                    is_enabled: true
                },
                {
                    email: 'cliente@wk3outlet.com.br',
                    password: 'teste@123#',
                    nome: 'Cliente',
                    sobrenome: '- WK3 Outlet',
                    isAdmin: false,
                    isEmployee: false,
                    isCompany: false,
                    is_enabled: true
                }
            ])
        })
}