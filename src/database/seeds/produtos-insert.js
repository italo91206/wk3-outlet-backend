exports.seed = function(knex){
    return knex('produtos').insert([
        {
            nome: 'Camiseta Bonita',
            preco: 149.90,
            estoque: 10,
            peso: 0.450,
            url: 'camiseta-bonita',
            custo: 49.90,
            lucro: 100.00,
            modelo_id: 1,
            marca_id: 1,
        },
        {
            nome: 'Camiseta Mais Bonita que a outra',
            preco: 189.90,
            estoque: 20,
            peso: 0.650,
            url: 'camiseta-mais-bonita-que-a-outra',
            custo: 89.90,
            lucro: 100.00,
            modelo_id: 1,
            marca_id: 2
        },
        {
            nome: 'Camiseta Feia',
            preco: 89.90,
            estoque: 10,
            peso: 0.450,
            url: 'camiseta-feia',
            custo: 49.90,
            lucro: 40.00,
            modelo_id: 1,
            marca_id: 1
        },
        {
            nome: 'Camiseta Horrorosa',
            preco: 359.90,
            estoque: 10,
            peso: 0.450,
            url: 'camiseta-feia',
            custo: 59.90,
            lucro: 300.00,
            modelo_id: 2,
            marca_id: 3,
        }
    ])
}