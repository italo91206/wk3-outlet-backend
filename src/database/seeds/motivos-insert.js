exports.seed = function(knex){
    return knex('motivos')
        .del()
        .then(function(){
            return knex('motivos').insert([
                { motivo: 'Receber itens', is_enabled: true },
                { motivo: 'Danificado', is_enabled: true },
                { motivo: 'Contagem de inventário', is_enabled: true },
                { motivo: 'Extraoficial', is_enabled: true }
            ])
        })
}