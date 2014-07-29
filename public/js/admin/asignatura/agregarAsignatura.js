/* Nodos */
var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtasigId = $('#txtasigId'),
	txtasigNombre = $('#txtasigNombre'),
	txtasigEstado = $('#txtasigEstado');

/* Funciones */
function agregarAsignatura(){
	if ( !validarAsignatura() ) 
		return false;

	var datos = $.ajax({
		url: 'agregarAsignatura',
		data: {
			id:txtasigId.val(),
			nombre:txtasigNombre.val(),
			estado:txtasigEstado.val()
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

	if ( res.status === 'Ok') {
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarAsignatura();
	}else 
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon+res.message);
	boxPoster.show().delay(3000).fadeOut();
} 

function limpiarAsignatura(){
	txtasigId.val('');
	txtasigNombre.val('');
}

function validarAsignatura(){
	if (txtasigId.val() === "" ){
		alert('Indique la clave de la asignatura');
		txtasigId.focus();
		return false;
	}
	if ( txtasigNombre.val() === ""){
		alert('Indique el nombre de la asignatura');
		txtasigNombre.focus();
		return false;
	}
	return true;
}

/* Eventos */
btnAgregar.on('click', agregarAsignatura);
btnCancelar.on('click', limpiarAsignatura);
$('#liAgregarAsignatura').addClass('active');