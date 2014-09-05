/* Nodos */
var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtCurp = $('#txtCurp'),
	txtApep = $('#txtApep'),
	txtApem = $('#txtApem'),
	txtNombre = $('#txtNombre'),
	txtSexo = $('#txtSexo'),
	txtTutor = $('#txtTutor'),
	txtTelefono = $('#txtTelefono'),
	txtDireccion = $('#txtDireccion'),
	txtEdad = $('#txtEdad'),
	txtEscuela = $('#txtEscuela'),
	txtObservacion = $('#txtObservacion');

/* Funciones */
function agregarAlumno(){
	if ( !validarAlumno() )
		return false;

	var datos = $.ajax({
    url:'agregarAlumno',
    data: {
    	curp: txtCurp.val(),
    	apep: txtApep.val(),
    	apem: txtApem.val(),
    	nombre: txtNombre.val(),
    	sexo: txtSexo.val(),
    	tutor: txtTutor.val(),
    	telefono: txtTelefono.val(),
    	direccion: txtDireccion.val(),
    	edad: txtEdad.val(),
    	escuela: txtEscuela.val(),
    	observacion: txtObservacion.val()
    },
    type:'post',
    dataType:'json',
    async:false
	}).error(function(e){
	    alert('Ocurrio un error, intente de nuevo');
	}).responseText;
	
	alert(datos);
  var res;
  try{
      res = JSON.parse(datos);
  }catch (e){
      messagePoster.html('Error JSON ' + e);
      boxPoster.show().delay(2000).fadeOut();
  }

  if ( res.status === 'OK' ){
  	icon = '<span class="glyphicon glyphicon-ok"></span> ';
  	limpiarAlumno();
  }else
  	icon = '<span class="glyphicon glyphicon-remove"></span> ';
  
  messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
}

function getEscuelas(){

	var datos = $.ajax({
		url: '../escuela/getEscuelas',
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
  	txtEscuela.html('');
  	$.each(res, function(k,v){
  		txtEscuela.append(
  			'<option value="'+v.escId+'">'+v.escNombre+' - '+v.turNombre+'</option>'
			);
  	});
  }else{
		messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' + 
			'No existen escuelas registradas');
    boxPoster.show().delay(2000).fadeOut();
  }
}
function limpiarAlumno(){
	txtCurp.val('');
	txtApep.val('');
	txtApem.val('');
	txtNombre.val('');
	txtTutor.val('');
	txtTelefono.val('');
	txtDireccion.val('');
	txtEdad.val('');
	txtObservacion.val('');
}

function validarAlumno(){
	if ( txtCurp.val() === "" || txtCurp.val().length < 18 ){
		alert('Indique una CURP válida');
		txtCurp.focus();
		return false;
	}
	if ( txtApep.val() === "" ){
		alert('Indique el apellido paterno alumno');
		txtApep.focus();
		return false;
	}
	if ( txtApem.val() === "" ){
		alert('Indique el apellido materno alumno');
		txtApem.focus();
		return false;
	}
	if ( txtNombre.val() === "" ){
		alert('Indique el nombre del alumno');
		txtNombre.focus();
		return false;
	}
	if ( txtTutor.val() === "" ){
		alert('Indique el nombre del padre o tutor');
		txtTutor.focus();
		return false;
	}
	if ( txtTelefono.val() === "" ){
		alert('Indique el teléfono del padre o tutor');
		txtTelefono.focus();
		return false;
	}
	if ( txtDireccion.val() === "" ){
		alert('Indique la dirección del alumno');
		txtDireccion.focus();
		return false;
	}
	var patt = new RegExp('^[0-9]{1,2}$');
	if ( txtEdad.val() === "" || !patt.test(txtEdad.val()) ){
		alert('Indique la edad del alumno');
		txtEdad.focus();
		return false;
	}
	if ( txtEscuela.val() === "" || txtEscuela.val() == null ){
		alert('Indique una escuela donde se inscribirá al alumno');
		txtEscuela.focus();
		return false;
	}
	return true;
}

/* Eventos */
$(document).on('ready', function(){
	limpiarAlumno();
	getEscuelas();
});
btnAgregar.on('click', agregarAlumno);
btnCancelar.on('click', limpiarAlumno);
$('#liAgregarAlumno').addClass('active');