exports.seed = function(knex){
    return knex('motivos')
        .del()
        .then(function(){
            return knex('motivos').insert([
                { motivo: 'Receber itens' },
                { motivo: 'Danificado' },
                { motivo: 'Contagem de inventário' },
                { motivo: 'Extraoficial' }
            ])
        })
}