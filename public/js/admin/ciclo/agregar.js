var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	slctGrupo = $('#slctGrupo'),
	slctGrado = $('#slctGrado'),
	slctCiclo = $('#slctCiclo');

function agregarCiclo(){
	if ( !validarCiclo() )
		return false;

	var datos = $.ajax({
        url:'agregarCiclo',
        data: {
        	ciclo: slctCiclo.val(),
					grupo: slctGrupo.val(),
					grado: slctGrado.val()
        },
        type:'post',
        dataType:'json',
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

	if ( res.status === 'OK' ){
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		        	limpiar();



	}else
		icon = '<span class="glyphicon glyphicon-remove"></span> ';
		messagePoster.html(icon + res.message);
		boxPoster.show().delay(3000).fadeOut();
}


/******************************************************************************/
function getGrados(){
	var datos = $.ajax({
		url: 'getGrados',
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
		slctGrado.html('');
		$.each(res, function(k,v){
			slctGrado.append(
				'<option value="'+v.gradId+'">'+v.gradId+'</option>'
			);
		});
	}else{
		messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
			'No existen grados registrados');
		boxPoster.show().delay(2000).fadeOut();
	}
}

/******************************************************************************/
function getGrupos(){
	var datos = $.ajax({
		url: 'getGrupos',
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
		slctGrupo.html('');
		$.each(res, function(k,v){
			slctGrupo.append(
				'<option value="'+v.grupId+'">'+v.grupNombre+'</option>'
			);
		});
	}else{
		messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
			'No existen grados registrados');
		boxPoster.show().delay(2000).fadeOut();
	}
}

/********************************************************************************/
function limpiar(){
	getGrados();
	getGrupos();
}
	/*******************************************************************************/
function validarCiclo(){
	if (slctCiclo.val() === ''){		/*Valor Z = valor por defecto, no ha realizado consulta*/
			alert("Seleccione un Ciclo");
			return false;
	}
	if(slctGrupo.val()=== ''){
		alert("Seleccione un Grupo");
		return false;
	}
		if(slctGrado.val()=== ''){
		alert("Seleccione un Grado");
		return false;
	}
	return true;
}

$(document).on('ready', function(){
	getGrados();
	getGrupos();
});

btnAgregar.on('click', agregarCiclo);
btnCancelar.on('click',limpiar);
$('#liAgregarCiclo').addClass('active');
