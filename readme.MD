## Instruções de deploy
O arquivo `.env` fica invisível ao repositório. É necessário setar manualmente cada variável na dashboard da Heroku

# Para criar um novo arquivo migration:
$ npx knex migrate:make nome_do_arquivo
# Para atualizar o BD com as migrations
$ npx knex migrate:latest