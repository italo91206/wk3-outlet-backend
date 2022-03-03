exports.seed = function(knex){
    return knex('marcas')
        .del()
        .then(function(){
            return knex('marcas').insert([
                { marca: 'Hugo Boss', is_enabled: true },
                { marca: 'Lacoste', is_enabled: true },
                { marca: 'Armani Exchange', is_enabled: true },
                { marca: 'Polo Ralpho', is_enabled: true },
                { marca: 'Dudalina', is_enabled: true }
            ])
        })
}