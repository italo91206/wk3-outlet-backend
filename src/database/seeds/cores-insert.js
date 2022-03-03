exports.seed = function(knex){
    return knex('cores')
        .del()
        .then(function(){
            return knex('cores').insert([
                {
                    cor: 'Vermelho',
                    hexa: '#d32f2f',
                    is_enabled: true
                },
                {
                    cor: 'Verde',
                    hexa: '#00695c',
                    is_enabled: true
                },
                {
                    cor: 'Roxo',
                    hexa: '#6a1b9a',
                    is_enabled: true
                },
                {
                    cor: 'Azul Escuro',
                    hexa: '#283593',
                    is_enabled: true
                },
                {
                    cor: 'Azul Claro',
                    hexa: '#1565c0',
                    is_enabled: true
                }
            ])
        })
}