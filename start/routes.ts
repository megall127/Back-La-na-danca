import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

Route.post('/register', 'UsersController.create').as('usuario.cadastro')

Route.post('/login', 'UsersController.login').as('usuario.log')

Route.get('/takedados', 'UsersController.takeDados').as('usuario.get')

Route.get('/takemonitor', 'UsersController.getMonitor').as('usuario.getMonitor')

Route.get('/takeprofessor', 'UsersController.getProfessor').as('usuario.getProfessor')

Route.post('/editpesinho', 'UsersController.editPesinho').as('usuario.editPesinho')

Route.post('/editvalidade', 'UsersController.editValidadeProf').as('usuario.editValidadeProf')

Route.get('/closemonth', 'UsersController.closeMonth').as('usuario.closerMonth')


//Rotas da Turma

Route.post('/registerclass' , 'ClassesController.create').as('classe.create')

Route.post('/takeclass' , 'ClassesController.getClasses').as('classe.take')

}).prefix('/api')
