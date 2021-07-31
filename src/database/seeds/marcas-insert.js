exports.seed = function(knex){
    return knex('marcas')
        .del()
        .then(function(){
            return knex('marcas').insert([
                { marca_id: 1, marca: 'Hugo Boss' },
                { marca_id: 2, marca: 'Lacoste' },
                { marca_id: 3, marca: 'Armani Exchange' },
                { marca_id: 4, marca: 'Polo Ralpho' },
                { marca_id: 5, marca: 'Dudalina' }
            ])
        })
}