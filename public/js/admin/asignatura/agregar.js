/* Nodos */
var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtClave = $('#txtClave'),
	txtNombre = $('#txtNombre'),
	sltArea = $('#sltArea');

/* Funciones */
function agregarAsignatura(){
	var verificar = new validar();
	var validarAsignatura = verificar.validarDatos(txtNombre.val(),txtClave.val());
	if ( !validarAsignatura ) 
		return false;

	var datos = $.ajax({
		url: 'agregarAsignatura',
		data: {
			clave: txtClave.val(),
			nombre: txtNombre.val(),
			area: sltArea.val()
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
		limpiarAsignatura();
	}else 
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon+res.message);
	boxPoster.show().delay(3000).fadeOut();
} 

function limpiarAsignatura(){
	txtClave.val('');
	txtNombre.val('');
}

/* Eventos */
btnAgregar.on('click', agregarAsignatura);
btnCancelar.on('click', limpiarAsignatura);
$('#liAgregarAsignatura').addClass('active');