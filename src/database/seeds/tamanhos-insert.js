exports.seed = function(knex){
    return knex('tamanhos')
        .del()
        .then(function(){
            return knex('tamanhos').insert([
                { tamanho: '34' },
                { tamanho: '35' },
                { tamanho: '36' },
                { tamanho: '37' },
                { tamanho: '38' },
                { tamanho: '39' },
                { tamanho: 'P' },
                { tamanho: 'PP' },
                { tamanho: 'M' },
                { tamanho: 'G' },
                { tamanho: 'GG' }
            ])
        })
}