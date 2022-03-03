exports.seed = function(knex){
    return knex('tamanhos')
        .del()
        .then(function(){
            return knex('tamanhos').insert([
                { tamanho: '34', is_enabled: true },
                { tamanho: '35', is_enabled: true },
                { tamanho: '36', is_enabled: true },
                { tamanho: '37', is_enabled: true },
                { tamanho: '38', is_enabled: true },
                { tamanho: '39', is_enabled: true },
                { tamanho: 'P', is_enabled: true },
                { tamanho: 'PP', is_enabled: true },
                { tamanho: 'M', is_enabled: true },
                { tamanho: 'G', is_enabled: true },
                { tamanho: 'GG', is_enabled: true }
            ])
        })
}