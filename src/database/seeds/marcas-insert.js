exports.seed = function(knex){
    return knex('marcas')
        .del()
        .then(function(){
            return knex('marcas').insert([
                { marca: 'Hugo Boss' },
                { marca: 'Lacoste' },
                { marca: 'Armani Exchange' },
                { marca: 'Polo Ralpho' },
                { marca: 'Dudalina' }
            ])
        })
}