exports.seed = function(knex){
    return knex('modelos')
        .del()
        .then(function(){
            return knex('modelos').insert([
                { modelo: 'T-Shirt', is_enabled: true },
                { modelo: 'Camiseta', is_enabled: true },
                { modelo: 'Polo', is_enabled: true },
                { modelo: 'Regata', is_enabled: true },
                { modelo: 'Social', is_enabled: true }
            ])
        })
}