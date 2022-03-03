exports.seed = function(knex){
  return knex('categorias')
    .del()
    .then(function(){
      return knex('categorias').insert([
        {
          nome_categoria: 'Outlet',
          url: 'outlet',
          is_enabled: true,
        },
        {
          nome_categoria: 'Promoção',
          url: 'promocao',
          is_enabled: true,
        },
        {
          nome_categoria: 'Teste',
          url: 'teste',
          is_enabled: true,
        },
        {
          nome_categoria: 'Teste 1',
          url: 'teste-1',
          is_enabled: true,
        },
        {
          nome_categoria: 'Teste 2',
          url: 'teste-2',
          is_enabled: true,
        },
        {
          nome_categoria: 'Calças',
          url: 'calças',
          is_enabled: true,
        },
        {
          nome_categoria: 'Camisetas',
          url: 'camisetas',
          is_enabled: true,
        },
        {
          nome_categoria: 'Calça longa',
          url: 'calça-longa',
          is_enabled: true,
        },
        {
          nome_categoria: 'Calça Curta',
          url: 'calça-curta',
          is_enabled: true,
        },
        {
          nome_categoria: 'Manga longa',
          url: 'camiseta-manga-longa',
          is_enabled: true,
        },
        {
          nome_categoria: 'Manga curta',
          url: 'camiseta-manga-curta',
          is_enabled: true,
        },
      ])
    })
}