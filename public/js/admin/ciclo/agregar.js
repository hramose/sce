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

	/*****************************************************************************/
function mostrarGrupos(){
	if (slctGrupo.val()=== 'Z'){	/*Para no repetir la consulta en cada clic y repetir valores*/
		var datosG = $.ajax({				/* el valor 'Z' tiene por defecto en option 'Selecione grupo'*/
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
				slctGrupo.append(										/*Agrega datos de la BD al select*/
					'<option value = "'+datoGrupo.grupId+'">'+datoGrupo.grupNombre+'</option>'
							/*value de select = id de Grupos      texto que muestra = grupNombre*/
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

/*******************************Mostrar Grados***********************/

function mostrarGrados(){
	if (slctGrado.val()=== 'Z'){	/*Para no repetir la consulta en cada clic y repetir valores*/
		var datosG = $.ajax({				/* el valor 'Z' tiene por defecto en option 'Selecione grados'*/
			url:'gradosActivos',
			data:{
				null:'null'
			},
			type:'post',
						dataType:'json',
						async:false
		}).error(function(e){
				alert('Ocurrio un error, intente de nuevo1');
		}).responseText;

		var res;
		try{
			res = JSON.parse(datosG);
		}catch (e){
			messagePoster.html('Error JSON ' + e);
			boxPoster.show().delay(2000).fadeOut();
		}

		slctGrado.html('');
		if ( res.status === 'OK' ){
			var i = 1;
			$.each(res.data, function(k,datoGrado){
				slctGrado.append(										/*Agrega datos de la BD al select*/
					'<option value = "'+datoGrado.gradId+'">'+datoGrado.gradId+'</option>'
							/*value de select = id de Grados     texto que muestra = gradId*/
				);

				i++;
			});
		}else{
			slctGrado.append(										//Mensaje en select cuando no existe grados en BD
				'<option value = "'+'Z'+'">'+res.message+'</option>'
			);
		}
		
	}
	
}



btnAgregar.on('click', agregarCiclo);
btnCancelar.on('click',cancelar);
slctGrupo.on('click',mostrarGrupos);		/*evento click sobre select*/
slctGrado.on('click',mostrarGrados);		/*evento click sobre select*/
$('#liAgregarCiclo').addClass('active');
