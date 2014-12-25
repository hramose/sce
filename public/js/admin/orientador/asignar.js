var slctGrupo = $('#slctGrupo'),
	slctGrado = $('#slctGrado'),
	slctCiclos = $('#slctCiclos'),
	slctProfesor = $('#slctProfesor'),
	slctCiclos = $('#slctCiclos'),
	btnAsignar = $('#btnAsignar'),
	btnCancelar = $('#btnCancelar');

function asignar(){

	var datos = $.ajax({
        url:'asignar',
        data: {
		        	ciclos:slctCiclos.val(),
		        	grado: slctGrado.val(),
		        	grupo: slctGrupo.val(),
					profesor: slctProfesor.val()
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
  	
	}else
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
	
}


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
			'No existen grupos registrados');
		boxPoster.show().delay(2000).fadeOut();
	}
}

//////////////////////////GetProfesor///////////////////////////////

function buscarProfesor(){

		var datos = $.ajax({
		url: 'buscarProfesor',
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
		slctProfesor.html('');
		$.each(res, function(k,v){
        	slctProfesor.append(
    				'<option value="'+v.profCurp+'">'+v.profNombre+'</option>'
    		);
    	});
    }else{
		messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
			'No existen Profesores registrados');
		boxPoster.show().delay(2000).fadeOut();
	}
}

function getCiclos(){
	var datos = $.ajax({
		url: 'getCiclos',
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
		slctCiclos.html('');
		$.each(res, function(k,v){
			slctCiclos.append(
				'<option value="'+v.cicCiclo+'">'+v.cicCiclo+'</option>'
			);
		});
	}else{
		messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
			'No existen ciclos registrados');
		boxPoster.show().delay(2000).fadeOut();
	}
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


$(document).on('ready', function(){
	getGrupos();
	getCiclos();
	buscarProfesor();
});
/* Eventos */
btnAsignar.on('click',asignar);
///btnAgregar.on('click', agregarCiclo);
$('#liAsignarOrientador').addClass('active');
