exports.seed = function(knex){
    return knex('modelos')
        .del()
        .then(function(){
            return knex('modelos').insert([
                { modelo: 'T-Shirt' },
                { modelo: 'Camiseta' },
                { modelo: 'Polo' },
                { modelo: 'Regata' },
                { modelo: 'Social' }
            ])
        })
}