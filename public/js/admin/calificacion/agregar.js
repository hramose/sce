/* Nodos */
var btnAgregar = $('#btnAgregar'),
  btnCancelar = $('#btnCancelar'),
  sltIdentificador = $('#sltIdentificador'),
  sltAsignatura = $('#sltAsignatura'),
  sltBimestre = $('#sltBimestre'),
  txtCalificacion = $('#txtCalificacion'),
  sltProfesor = $('#sltProfesor');
var pnlAgregarCal = $('#pnlAgregarCal'),
  formSelectAlumno = $('#formSelectAlumno'),
  datoGrupo = $('#datoGrupo');
var sltCiclo = $('#sltCiclo'),
  sltGrado = $('#sltGrado'),
  sltGrupo = $('#sltGrupo'),
  btnSeleccionarAlumno = $('#btnSeleccionarAlumno');


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
    sltIdentificador.val("");
    sltAsignatura.val("");
    sltBimestre.val("");
    txtCalificacion.val("");
    sltProfesor.val("");
  }else
    icon = '<span class="glyphicon glyphicon-remove"></span> ';

  messagePoster.html(icon+res.message);
  boxPoster.show().delay(3000).fadeOut();
}
  /*********************************************************************/
function getAlumno(){
  if (!validarSeleccion())
    return false;

  var datos = $.ajax({
    url: '../identificador/getAlumnosGrupo',
    data:
      {
        ciclo : sltCiclo.val(),
        grado : sltGrado.val(),
        grupo : sltGrupo.val()
      },
    type: 'post',
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
        '<option value="'+v.ideId+'">'+v.aluApep+' '+v.aluApem+' '+v.aluNombre+'</option>'
      );
    });
    getAsignaturas();
    getProfesores();
    var sltGrupo2=document.getElementById('sltGrupo');  /*acceder a texto del select*/
    var grupoString = sltGrupo2.options[sltGrupo2.selectedIndex].text;
    datoGrupo.val('Grado: '+sltGrado.val()+'  Grupo: '+grupoString+'  Ciclo: '+sltCiclo.val());
    formSelectAlumno.addClass('hidden');
    pnlAgregarCal.removeClass('hidden');
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen alumnos asociados con dichos parametros');
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

function getCiclos(){
  var datos = $.ajax({
    url: '../ciclo/getCiclos',
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
    sltCiclo.html('');
    $.each(res, function(k,v){
      sltCiclo.append(
        '<option value="'+v.cicCiclo+'">'+v.cicCiclo+'</option>'  /* cicCiclo en value, ya que se agrupa y existen muchos cicCiclo*/
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen ciclos registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}
  /************************************************************************/
function getGrupos(){
  var datos = $.ajax({
    url: '../ciclo/getGrupos',
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
    sltGrupo.html('');
    $.each(res, function(k,v){
      sltGrupo.append(
        '<option value="'+v.grupId+'">'+v.grupNombre+'</option>'
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen grupos registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}
/*********************************************************************/
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
      'No existen profesores registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}

  /******************************************************************/
function limpiarCalificacion(){
  sltIdentificador.html('');
  sltAsignatura.html('');
  sltBimestre.val("");
  txtCalificacion.val("");
  sltProfesor.html('');
  sltCiclo.val("");
  sltGrado.val("");
  sltGrupo.val("");
  pnlAgregarCal.addClass('hidden');
  formSelectAlumno.removeClass('hidden');
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
function validarSeleccion(){
  if ( sltCiclo.val() === "" || sltCiclo.val()=== null ){
    alert('Seleccione un ciclo');
    sltCiclo.focus();
    return false;
  }
  if ( sltGrado.val() === "" || sltGrado.val()=== null ){
    alert('Seleccione un grado');
    sltAsignatura.focus();
    return false;
  }
  if ( sltGrupo.val() === "" || sltGrupo.val()=== null ){
    alert('Seleccione un grupo');
    sltBimestre.focus();
    return false;
  }
  return true;
}
/* Eventos */
$(document).on('ready', function(){
  getCiclos();
  getGrupos();
});

btnAgregar.on('click', agregarCalificacion);
btnCancelar.on('click', limpiarCalificacion);
btnSeleccionarAlumno.on('click', getAlumno);
$('#liAgregarCalificacion').addClass('active');
