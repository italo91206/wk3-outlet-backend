exports.seed = function(knex){
  return knex('categorias')
    .del()
    .then(function(){
      return knex('categorias').insert([
        {
          categoria_id: 1,
          nome: 'Outlet',
          url: 'outlet',
          descricao: 'Categoria padrão da loja.',
          categoria_pai: null,
        },
        {
          categoria_id: 2,
          nome: 'Promoção',
          url: 'promocao',
          descricao: 'Categoria para promções',
          categoria_pai: null,
        },
        {
          categoria_id: 3,
          nome: 'Teste',
          url: 'teste',
          descricao: 'Categoria de teste',
          categoria_pai: null,
        },
        {
          categoria_id: 4,
          nome: 'Teste 1',
          url: 'teste-1',
          descricao: 'Categoria de teste 1',
          categoria_pai: 3,
        },
        {
          categoria_id: 5,
          nome: 'Teste 2',
          url: 'teste-2',
          descricao: 'Categoria de teste 2',
          categoria_pai: 4,
        },
        {
          categoria_id: 6,
          nome: 'Calças',
          url: 'calças',
          descricao: 'Categoria de calças',
          categoria_pai: 1,
        },
        {
          categoria_id: 7,
          nome: 'Camisetas',
          url: 'camisetas',
          descricao: 'Categoria de camisetas',
          categoria_pai: 1,
        },
        {
          categoria_id: 8,
          nome: 'Calça longa',
          url: 'calça-longa',
          descricao: 'Categoria de calças longas',
          categoria_pai: 6,
        },
        {
          categoria_id: 9,
          nome: 'Calça Curta',
          url: 'calça-curta',
          descricao: 'Categoria de calças curtas',
          categoria_pai: 6,
        },
        {
          categoria_id: 10,
          nome: 'Manga longa',
          url: 'camiseta-manga-longa',
          descricao: 'Categoria de camisetas com manga longa',
          categoria_pai: 7,
        },
        {
          categoria_id: 11,
          nome: 'Manga curta',
          url: 'camiseta-manga-curta',
          descricao: 'Categoria de camisetas com manga curta',
          categoria_pai: 7,
        },
      ])
    })
}