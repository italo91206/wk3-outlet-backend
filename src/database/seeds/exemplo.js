exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ambientes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ambientes').insert([
        { nome: 'Quarto', ativo: true },
        { nome: 'Sala', ativo: true },
        { nome: 'Cozinha', ativo: true },
        { nome: 'Banheiro', ativo: true },
      ]);
    });
};
