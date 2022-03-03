exports.seed = function(knex){
    return knex('cores')
        .del()
        .then(function(){
            return knex('cores').insert([
                {
                    cor: 'Vermelho',
                    hexa: '#d32f2f'
                },
                {
                    cor: 'Verde',
                    hexa: '#00695c'
                },
                {
                    cor: 'Roxo',
                    hexa: '#6a1b9a'
                },
                {
                    cor: 'Azul Escuro',
                    hexa: '#283593'
                },
                {
                    cor: 'Azul Claro',
                    hexa: '#1565c0'
                }
            ])
        })
}