exports.seed = function(knex){
    return knex('cupons')
        .del()
        .then(function(){
            return knex('cupons').insert([
                {
                    codigo: 'XXV-CYV-ZXC-2021',
                    nome: 'Cupom padrão valor fixo',
                    validade: '01/01/2022',
                    valor: 30,
                    is_percent: false,
                    is_fixed: true,
                },
                {
                    codigo: 'CUPOM2020',
                    nome: 'Cupom padrão valor percentual',
                    validade: '01/01/2022',
                    valor: 25,
                    is_percent: true,
                    is_fixed: false,
                },
                {
                    codigo: 'VERAO2020',
                    nome: 'Cupom padrão expirado',
                    validade: '01/01/2020',
                    valor: 10,
                    is_percent: false,
                    is_fixed: true,
                }
            ])
        });
}