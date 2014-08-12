/* Nodos */
var btnAgregar = ('#btnAgregar'),
	btnCancelar = ('#btnCancelar'),
	txtNombreTec = ('#txtNombreTec');

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
		dataType: 'json'
		async: false
	}).error( function (e){
		alert('ocurrio un error');
	}).responseText;

	var res;
	try{
		res = json.parse(datos);
	}catch(e){
		messagePoster.html('Error Json' + e);
		boxPoster.show().delay(2000).fadeOut();
	}
	if ( res.status === 'Ok') {
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarTecnologia;
	}else 
		ico = '<span class="glyphicon glyphicon-remove"></span> ';
		messagePoster.html(icon+res.message);
		boxPoster.show().delay(3000).fadeOut();
}

function limpiarTecnologia(){
	txtNombreTec.val('');
}

function validarTecnologia(){
	if (txtNombreTec === "" ){
		alert('Indique el nombre de la tec');
		txtNombreTec.focus();
		return false;
	}
	return true;
}

/* Eventos */
btnAgregar.onClick('click', agregarTecnologia);
btnCancelar.onClick('click', limpiarTecnologia);


