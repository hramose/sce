/* Nodos */
var btnAgregarTecnologia = $('#btnAgregarTecnologia'),
	btnCancelarTecnologia = $('#btnCancelarTecnologia'),
	txtNombreTec = $('#txtNombreTec');

/* Funciones */
function agregarTecnologia(){
	if ( !validarTecnologia () )
		return false;

	var datos = $.ajax({
		url: 'agregarTecnologia',
		data:{
			nombreT:txtNombreTec.val()
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
		limpiarTecnologia();
	}else 
		ico = '<span class="glyphicon glyphicon-remove"></span> ';
		messagePoster.html(icon+res.message);
		boxPoster.show().delay(3000).fadeOut();
}

function limpiarTecnologia(){
	txtNombreTec.val('');
}

function validarTecnologia(){
	if (txtNombreTec.val() === "" ){
		alert('Indique el nombre de la asignatura de tecnologia');
		txtNombreTec.focus();
		return false;
	}
	return true;
}

/* Eventos */
btnAgregarTecnologia.on('click', agregarTecnologia);
btnCancelarTecnologia.on('click', limpiarTecnologia);


