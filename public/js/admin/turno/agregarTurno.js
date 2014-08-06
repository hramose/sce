/* Nodos */
var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtId = $('#txtId'),
	txtNombre = $('#txtNombre');

/* Funciones */
function agregarTurno(){
	if ( !validarTurno() ) 
		return false;

	var datos = $.ajax({
		url: 'agregarTurno',
		data: {
			id:txtId.val(),
			nombre:txtNombre.val()
		},
		type: 'post',
		dataType: 'json',
		async: false
	}).error(function(e){
		alert('Ocurrio un error, intente nuevamente');
	}).responseText;
/* alert(datos); /* este alert sirve para ubicar el error */
	var res;
	try{
		res = JSON.parse(datos);
	}catch(e){
		messagePoster.html('Error JSON' + e);
		boxPoster.show().delay(2000).fadeOut();	
	}

	if ( res.status === 'Ok') {
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarTurno();
	}else 
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon+res.message);
	boxPoster.show().delay(3000).fadeOut();
} 

function limpiarTurno(){
	txtId.val('');
}

function validarTurno(){
	if (txtId.val() === "" ){
		alert('Indique la clave del turno');
		txtId.focus();
		return false;
	}
	return true;
}
/* Eventos */
btnAgregar.on('click', agregarTurno);
btnCancelar.on('click', limpiarTurno);
$('#liAgregarTurno').addClass('active');
