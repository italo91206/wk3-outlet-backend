exports.seed = function(knex){
    return knex('modelos')
        .del()
        .then(function(){
            return knex('modelos').insert([
                { modelo_id: 1, modelo: 'T-Shirt' },
                { modelo_id: 2, modelo: 'Camiseta' },
                { modelo_id: 3, modelo: 'Polo' },
                { modelo_id: 4, modelo: 'Regata' },
                { modelo_id: 5, modelo: 'Social' }
            ])
        })
}