/* Nodos */
var btnAgregarArte = $('#btnAgregarArte'),
	btnCancelarArte = $('#btnCancelarArte'),
	txtNombreArt = $('#txtNombreArt');

/* Funciones */
function agregarArte(){
	if ( !validarArte () )
		return false;

	var datos = $.ajax({
		url: 'agregarArte',
		data:{
			nombreA:txtNombreArt.val()
		},
		type: 'post',
		dataType: 'json',
		async: false
	}).error( function (e){
		alert('ocurrio un error');
	}).responseText;

	var res;
	try{
		res = JSON.parse(datos);
	}catch(e){
		messagePoster.html('Error Json' + e);
		boxPoster.show().delay(2000).fadeOut();
	}
	if ( res.status === 'OK') {
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarArte();
	}else 
		ico = '<span class="glyphicon glyphicon-remove"></span> ';
		messagePoster.html(icon+res.message);
		boxPoster.show().delay(3000).fadeOut();
}

function limpiarArte(){
	txtNombreArt.val('');
}

function validarArte(){
	if (txtNombreArt.val() === "" ){
		alert('Indique el nombre de la asignatura de arte');
		txtNombreArt.focus();
		return false;
	}
	return true;
}

/* Eventos */
btnAgregarArte.on('click', agregarArte);
btnCancelarArte.on('click', limpiarArte);


