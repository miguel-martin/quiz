var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

var sessionController = require('../controllers/session_controller');

/* Página de entrada (home page) */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

// Autoload de comandos con :quizId
// Filosofía DRY (don't repeat yourself): hacer todo lo común en el .load y después lo específico en cada función específica
// Esta línea quiere decir que si existe el parámetro quizId en la ruta, invoque el autoload...
router.param('quizId', quizController.load);  // autoload :quizId


// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión



// Definición de rutas ...
router.get('/author',			   quizController.author);
router.get('/quizes',                      quizController.index);
router.get('/quizes/new',		   quizController.new);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.post('/quizes/create',		   quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);


router.get('/quizes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',              commentController.create);

module.exports = router;
