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
	txtEdad = $('#txtEdad');

/* Funciones */
function agregarAlumno(){
	if ( !validarAlumno() )
		return false;

	alert('bien');
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
	if ( txtEdad.val() === "" ){
		alert('Indique la edad del alumno');
		txtEdad.focus();
		return false;
	}
	return true;
}

/* Eventos */
btnAgregar.on('click', agregarAlumno);
btnCancelar.on('click', limpiarAlumno);
$('#liAgregarAlumno').addClass('active');