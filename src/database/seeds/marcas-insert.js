exports.seed = function(knex){
    return knex('marcas')
        .del()
        .then(function(){
            return knex('marcas').insert([
                { marca_id: 1, marca: 'Hugo Boss', is_enabled: true },
                { marca_id: 2, marca: 'Lacoste', is_enabled: true },
                { marca_id: 3, marca: 'Armani Exchange', is_enabled: true },
                { marca_id: 4, marca: 'Polo Ralpho', is_enabled: true },
                { marca_id: 5, marca: 'Dudalina', is_enabled: true }
            ])
        })
}