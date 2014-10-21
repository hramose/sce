/* Nodos */
var btnAgregar = $('#btnAgregar'),
  btnCancelar = $('#btnCancelar'),
  sltIdentificador = $('#sltIdentificador'),
  sltAsignatura = $('#sltAsignatura'),
  sltBimestre = $('#sltBimestre'),
  txtCalificacion = $('#txtCalificacion'),
  sltProfesor = $('#sltProfesor');


function agregarCalificacion(){
  if ( !validarCalificacion() )
    return false;

  var datos = $.ajax({
    url: 'agregarCalificacion',
    data: {
      calificacion: txtCalificacion.val(),
      bimestre: sltBimestre.val(),
      identificador: sltIdentificador.val(),
      asignatura: sltAsignatura.val(),
      profesor: sltProfesor.val()
    },
    type: 'post',
    dataType: 'json',
    async: false
  }).error(function(e){
    alert('Ocurrio un error, intente de nuevo');
  }).responseText;

  var res;
  try{
    res = JSON.parse(datos);
  }catch(e){
    messagePoster.html('Error JSON' + e);
    boxPoster.show().delay(2000).fadeOut();
  }

  if ( res.status === 'OK') {
    icon = '<span class="glyphicon glyphicon-ok"></span> ';
    limpiarCalificacion();
  }else
    icon = '<span class="glyphicon glyphicon-remove"></span> ';

  messagePoster.html(icon+res.message);
  boxPoster.show().delay(3000).fadeOut();
}
  /*********************************************************************/
function getIdentificador(){
  var datos = $.ajax({
    url: '../identificador/getIdentificadores',
    type: 'get',
    async:false
  }).error(function(e){
      alert('Ocurrio un error, intente de nuevo');
  }).responseText;

  var res;
  try{
      res = JSON.parse(datos);
  }catch (e){
      messagePoster.html('Error JSON ' + e);
      boxPoster.show().delay(2000).fadeOut();
  }

  if ( res.length > 0 ){
    sltIdentificador.html('');
    $.each(res, function(k,v){
      sltIdentificador.append(
        '<option value="'+v.ideId+'">'+v.aluApep+' '+v.aluApem+' '+v.aluNombre+' - '+v.cicGrado+'° '+v.cicCiclo+' </option>'
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen alumnos asociados a grupos');
    boxPoster.show().delay(2000).fadeOut();
  }
}

  /***********************************************************************/
function getAsignaturas(){
  var datos = $.ajax({
    url: '../asignatura/getAsignaturas',
    type: 'get',
    async:false
  }).error(function(e){
      alert('Ocurrio un error, intente de nuevo');
  }).responseText;

  var res;
  try{
      res = JSON.parse(datos);
  }catch (e){
      messagePoster.html('Error JSON ' + e);
      boxPoster.show().delay(2000).fadeOut();
  }

  if ( res.length > 0 ){
    sltAsignatura.html('');
    $.each(res, function(k,v){
      sltAsignatura.append(
        '<option value="'+v.asigId+'">'+v.asigArea+'  -  '+v.asigNombre+'</option>'
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen asignaturas registradas');
    boxPoster.show().delay(2000).fadeOut();
  }
}
  /************************************************************************/
function getProfesores(){
  var datos = $.ajax({
    url: '../profesor/getProfesores',
    type: 'get',
    async:false
  }).error(function(e){
      alert('Ocurrio un error, intente de nuevo');
  }).responseText;

  var res;
  try{
      res = JSON.parse(datos);
  }catch (e){
      messagePoster.html('Error JSON ' + e);
      boxPoster.show().delay(2000).fadeOut();
  }

  if ( res.length > 0 ){
    sltProfesor.html('');
    $.each(res, function(k,v){
      sltProfesor.append(
        '<option value="'+v.profCurp+'">'+v.profNombre+'</option>'
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen asignaturas registradas');
    boxPoster.show().delay(2000).fadeOut();
  }
}

  /******************************************************************/
function limpiarCalificacion(){
  sltIdentificador.val("");
  sltAsignatura.val("");
  sltBimestre.val("");
  txtCalificacion.val("");
  sltProfesor.val("");
}
  /*****************************************************************/

function validarCalificacion(){
  if ( sltIdentificador.val() === "" || sltIdentificador.val()=== null ){
    alert('Seleccione un alumno');
    sltIdentificador.focus();
    return false;
  }
  if ( sltAsignatura.val() === "" || sltAsignatura.val()=== null ){
    alert('Seleccione un asignatura');
    sltAsignatura.focus();
    return false;
  }
  if ( sltBimestre.val() === "" || sltBimestre.val()=== null ){
    alert('Seleccione un bimestre');
    sltBimestre.focus();
    return false;
  }
  if ( txtCalificacion.val() === "" ){
    alert('Indique una calificación');
    txtCalificacion.focus();
    return false;
  }
  if ( sltProfesor.val() === "" || sltProfesor.val()=== null ){
    alert('Seleccione un profesor');
    sltProfesor.focus();
    return false;
  }
  return true;
}

/* Eventos */
$(document).on('ready', function(){
  getAsignaturas();
  getProfesores();
  getIdentificador();
});

btnAgregar.on('click', agregarCalificacion);
btnCancelar.on('click', limpiarCalificacion);
$('#liAgregarCalificacion').addClass('active');
