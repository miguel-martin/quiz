var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* Página de entrada (home page) */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
// Filosofía DRY (don't repeat yourself): hacer todo lo común en el .load y después lo específico en cada función específica
// Esta línea quiere decir que si existe el parámetro quizId en la ruta, invoque el autoload...
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas ...
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author',			   quizController.author);

module.exports = router;
