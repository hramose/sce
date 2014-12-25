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
var idCiclos="";

function agregarCalificacion(){
  if ( !validarCalificacion() )
    return false;
  //  alert(sltAsignatura.val()+" "+sltProfesor.val()+" "+idCiclos);
  var idDocente="";   //para optener id para relacionar tabla calificacion y docente
  var datosD = $.ajax({
    url: '../docente/getIdDocente',
    data: {
      asignatura: sltAsignatura.val(),
      profesor: sltProfesor.val(),
      ciclosId: idCiclos
    },
    type: 'get',
    dataType: 'json',
    async: false
  }).error(function(e){
    alert('Ocurrio un error, intente de nuevo');
  }).responseText;

  var resD;
  try{
    resD = JSON.parse(datosD);
  }catch(e){
    messagePoster.html('Error JSON' + e);
    boxPoster.show().delay(2000).fadeOut();
  }

  if ( resD.length > 0 ){
    $.each(resD, function(k,v){
      idDocente = v.docId;
      //alert(idDocente);
    });
  //  alert(txtCalificacion.val()+" "+sltBimestre.val()+" "+sltIdentificador.val()+" "+idDocente);
    var datos = $.ajax({
      url: 'agregarCalificacion',
      data: {
        calificacion: txtCalificacion.val(),
        bimestre: sltBimestre.val(),
        identificador: sltIdentificador.val(),
        docente: idDocente
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
      //sltAsignatura.val("");
      sltBimestre.val("");
      txtCalificacion.val("");
      sltProfesor.val("");
    }else{
      icon = '<span class="glyphicon glyphicon-remove"></span> ';
    }

    messagePoster.html(icon+res.message);
    boxPoster.show().delay(3000).fadeOut();
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
    'Aun no existen profesores asociados a ese ciclo escolar');
    boxPoster.show().delay(2000).fadeOut();
  }
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
      idCiclos = v.cicId;             //para seleccionar profesor en tabla cocentes
      sltIdentificador.append(
        '<option value="'+v.ideId+'">'+v.aluApep+' '+v.aluApem+' '+v.aluNombre+'</option>'
      );
    });
    getProfesores();
    //var sltGrupo2=document.getElementById('sltGrupo');  /*acceder a texto del select*/
    //var grupoString = sltGrupo2.options[sltGrupo2.selectedIndex].text;
    //datoGrupo.val('Grado: '+sltGrado.val()+'  Grupo: '+grupoString+'  Ciclo: '+sltCiclo.val());
    //formSelectAlumno.addClass('hidden');
    //pnlAgregarCal.removeClass('hidden');
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
  var asignatura = sltAsignatura.val();
  //alert(idCiclos+" "+asignatura);

  var datos = $.ajax({
    url: '../profesor/getProfesoresAsignatura',
    data:{
      cicloId:idCiclos,
      asignaturaId:sltAsignatura.val()
    },
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
    var sltGrupo2=document.getElementById('sltGrupo');  /*acceder a texto del select*/
    var grupoString = sltGrupo2.options[sltGrupo2.selectedIndex].text;
    datoGrupo.val('Grado: '+sltGrado.val()+'  Grupo: '+grupoString+'  Ciclo: '+sltCiclo.val());
    formSelectAlumno.addClass('hidden');
    pnlAgregarCal.removeClass('hidden');            //muestra panel agregar calificacion
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen profesores registrados a esa asignatura, verifique');
    boxPoster.show().delay(2500).fadeOut();
  }
}

  /******************************************************************/
function limpiarCalificacion(){
  sltIdentificador.html('');
  sltAsignatura.val("");
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
    sltGrado.focus();
    return false;
  }
  if ( sltGrupo.val() === "" || sltGrupo.val()=== null ){
    alert('Seleccione un grupo');
    sltGrupo.focus();
    return false;
  }
  if ( sltAsignatura.val() === "" || sltAsignatura.val()=== null ){
    alert('Seleccione una asignatura');
    sltAsignatura.focus();
    return false;
  }
  return true;
}
/* Eventos */
$(document).on('ready', function(){
  getCiclos();
  getGrupos();
  getAsignaturas();
});

btnAgregar.on('click', agregarCalificacion);
btnCancelar.on('click', limpiarCalificacion);
btnSeleccionarAlumno.on('click', getAlumno);
$('#liAgregarCalificacion').addClass('active');
