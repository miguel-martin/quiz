// File: controllers/quiz_controller.js

// modulo7
var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};


// GET /author
exports.author = function(req,res){
   res.render('author', {nombre: 'Miguel Martín', foto: '/images/foto-perfil.jpg'});
}

// GET /quizes
exports.index = function(req, res) {

  // si no hay valor en 'search', mostrar todo... 
  if (!req.query.search){
      models.Quiz.findAll().then(
        function(quizes) {
          res.render('quizes/index', { quizes: quizes, mensaje: 'Mostrando todos los quizes'});
        }
      ).catch(function(error) { next(error);})
  }
  else{
      var search = "%" + req.query.search.replace(" ","%") + "%"
      models.Quiz.findAll({where: ["pregunta like ?", search], order: 'pregunta ASC'}).then(
        function(quizes) {
          res.render('quizes/index', { quizes: quizes, mensaje: 'Mostrando resultados para "' + req.query.search + '"' });
        }
      ).catch(function(error) { next(error);})
  }

};


// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta--", respuesta: "Respuesta--"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  console.log("CREATE: Llego a /quizes/create con el valor quiz['pregunta']"+quiz['pregunta'] );
// guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');  
  })   // res.redirect: Redirección HTTP a lista de preguntas
};


// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};
