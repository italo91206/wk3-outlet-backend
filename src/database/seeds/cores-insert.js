exports.seed = function(knex){
    return knex('cores')
        .del()
        .then(function(){
            return knex('cores').insert([
                {
                    cor_id: 1,
                    cor: 'Vermelho',
                    hexa: '#d32f2f'
                },
                {
                    cor_id: 2,
                    cor: 'Verde',
                    hexa: '#00695c'
                },
                {
                    cor_id: 3,
                    cor: 'Roxo',
                    hexa: '#6a1b9a'
                },
                {
                    cor_id: 4,
                    cor: 'Azul Escuro',
                    hexa: '#283593'
                },
                {
                    cor_id: 5,
                    cor: 'Azul Claro',
                    hexa: '#1565c0'
                }
            ])
        })
}