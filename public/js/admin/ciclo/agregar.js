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
		        	slctCiclo.val('Z');



	}else
		icon = '<span class="glyphicon glyphicon-remove"></span> ';
		messagePoster.html(icon + res.message);
		boxPoster.show().delay(3000).fadeOut();
}

	/********************************************************************************/
function cancelar(){
		alert(slctGrupo.val());
		alert(slctGrado.val());
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
	/*****************************************************************************/
function mostrarGrupos(){
	if (slctGrupo.val()=== 'Z'){	//Para no repetir la consulta en cada clic y repetir valores
		var datosG = $.ajax({				// el valor 'Z' tiene por defecto en option 'Selecione grupo'
			url:'gruposActivos',
			data:{
				null:'null'
			},
			type:'post',
						dataType:'json',
						async:false
		}).error(function(e){
				alert('Ocurrio un error, intente de nuevo');
		}).responseText;

		var res;
		try{
			res = JSON.parse(datosG);
		}catch (e){
			messagePoster.html('Error JSON ' + e);
			boxPoster.show().delay(2000).fadeOut();
		}

		slctGrupo.html('');
		if ( res.status === 'OK' ){
			var i = 1;
			$.each(res.data, function(k,datoGrupo){
				slctGrupo.append(										//Agrega datos de la BD al select
					'<option value = "'+datoGrupo.grupId+'">'+datoGrupo.grupNombre+'</option>'
							//value de select = id de Grupos      texto que muestra = grupNombre
				);

				i++;
			});
		}else{
			slctGrupo.append(										//Mensaje en select cuando no existe grupos en BD
				'<option value = "'+'Z'+'">'+res.message+'</option>'
			);
		}

	}

}

	/*******************************************************************************/
function validarCiclo(){
	if (slctCiclo.val() === 'Z'){		/*Valor Z = valor por defecto, no ha realizado consulta*/
			alert("Seleccione un Ciclo");
			return false;
	}
	if(slctGrupo.val()=== 'Z'){
		alert("Seleccione un Grupo");
		return false;
	}
		if(slctGrado.val()=== 'Z'){
		alert("Seleccione un Grado");
		return false;
	}
	return true;
}

$(document).on('ready', function(){
	getGrados();
});

btnAgregar.on('click', agregarCiclo);
btnCancelar.on('click',cancelar);
slctGrupo.on('click',mostrarGrupos);		/*evento click sobre select*/
$('#liAgregarCiclo').addClass('active');
