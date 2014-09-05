/* Nodos */
var btnGuardarE = $('#btnGuardarE'),
		btnCancelarE = $('#btnCancelarE');

	/* Tabla escuelas encontrados */
var tblEscuelas = $('#tblEscuelas'),
	tbodyEscuelas = $('#tbodyEscuelas');

	/*formulario muestra datos a editar*/
var formEditarE = $('#formEditarE'),
		txtIdE = $('#txtIdE'),
		txtNombreE = $('#txtNombreE'),
		txtZonaE = $('#txtZonaE'),
		txtDireccionE = $('#txtDireccionE'),
		txtTelefonoE = $('#txtTelefonoE'),
		txtDirectorE = $('#txtDirectorE'),
		txtTurnoE = $('#txtTurnoE'),
		txtEstadoE = $('#txtEstadoE');

var escuelaSeleccionada;

function buscarEscuela(){

	var datos = $.ajax({
		url: 'getEscuelas',
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

    tbodyEscuelas.html('');
    if ( res.length > 0 ){
		 	var i = 1;
    	$.each(res, function(k,o){
    		if ( o.escEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyEscuelas.append(
    			'<tr>'+
  					'<td>'+i+'</td>'+
    				'<td>'+o.escId+'</td>'+
    				'<td>'+o.escNombre+'</td>'+
    				'<td>'+o.turNombre+'</td>'+
    				'<td class="center">'+o.escTelefono+'</td>'+
    				'<td class="center">'+status+'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-edit" id="'+o.escId+'" '+
    					'style="cursor:pointer" title="Editar"></span>'+
					'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-trash" id="'+o.escId+'" '+
    					'style="cursor:pointer" title="Eliminar"></span>'+
					'</td>'+
    			'</tr>'
			);
			i++;
    	});
    }else{
    	messagePoster.html('No se encontraron escuelas');
      boxPoster.show().delay(2000).fadeOut();
    	tbodyEscuelas.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');
    }

	tblEscuelas.removeClass('hidden');
	//limpiarOcultarEdicion();
}

	/****************************************************************************/
function eliminarEscuela(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar la escuela?');
	if ( del === false )
		return false;

	var datos = $.ajax({
		url: 'eliminarEscuela',
		data: {
			id: id
		},
		type: 'post',
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
    	buscarEscuela();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';

    messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
}

		/**************************************************************************/
function editarEscuela(){
	if(escuelaSeleccionada === "")	/*escuelaSeleccionada variable global, se le asigna valor en funcion seleccionarEscuela*/
		return false;

	var editar = $.ajax({
		url: 'editarEscuela',
		data: {
			id: escuelaSeleccionada,		/*id=ct actual, id dentro de BD a buscar*/
			ct: txtIdE.val(),						/*nuevo ct a ingresar*/
			nombre: txtNombreE.val(),
			zona: txtZonaE.val(),
			direccion: txtDireccionE.val(),
			telefono: txtTelefonoE.val(),
			director: txtDirectorE.val(),
			turno: txtTurnoE.val(),
			estado: txtEstadoE.val()
		},
		type: 'post',
		dataType:'json',
		async:false
	}).error(function(e){
			alert('Ocurrio un error, intente de nuevo');
	}).responseText;

	var res;
	try{
			res = JSON.parse(editar);
	}catch (e){
			messagePoster.html('Error JSON ' + e);
			boxPoster.show().delay(2000).fadeOut();
	}

	if ( res.status === 'OK' ){
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarOcultarEdicion();
		buscarEscuela();		/*Para actualizar datos que se muestran dentro del cuerpo de tabla*/
	}else
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();

}

		/**************************************************************************/
function limpiarOcultarEdicion(){
	txtIdE.val("");
	txtNombreE.val("");
	txtZonaE.val("");
	txtDireccionE.val("");
	txtTelefonoE.val("");
	txtDirectorE.val("");
	txtTurnoE.val("");
	txtEstadoE.val("");
	formEditarE.addClass('hidden');
}

		/**************************************************************************/
function seleccionarEscuela(){
		var id = $(this).attr('id');
		if (id==="")
			return false;
		escuelaSeleccionada = id;

		var datos = $.ajax({
			url: 'seleccionarEscuela',
			data: {
				id: escuelaSeleccionada
			},
			type: 'post',
			dataType:'json',
			async:false
		}).error(function(e){
			alert('Ocurrio un error, intente de nuevo');
		}).responseText;

		var res;
		try{
				res = JSON.parse(datos);

				}catch(e){
				messagePoster.html('Error JSON ' + e);
				boxPoster.show().delay(2000).fadeOut();
			}

		if(res.status === 'OK'){
			var esc = res.data.escuelas,
				turnos = res.data.turnos;

			txtTurnoE.html('');
			$.each(turnos, function(k,v){
				txtTurnoE.append(
					'<option value="'+v.turId+'">'+v.turNombre+'</option>'
				);
			});

			txtIdE.val(esc.escId);
			txtNombreE.val(esc.escNombre);
			txtZonaE.val(esc.escZona);
			txtDireccionE.val(esc.escDireccion);
			txtTelefonoE.val(esc.escTelefono);
			txtDirectorE.val(esc.escDirector);
			txtEstadoE.val(esc.escEstado);

			txtTurnoE.find('option').each(function(){
				if ( esc.escTurno == $(this).val() )
					txtTurnoE.val(esc.escTurno);
			});

			txtEstadoE.find('option').each(function(){
				if( esc.escEstado == $(this).val() )
					txtEstadoE.val(esc.escEstado);
			});

			formEditarE.removeClass('hidden');
		}
}

/* Eventos */
$(document).on('ready', function(){
	buscarEscuela();
	getTurnos();
});
btnGuardarE.on('click', editarEscuela);
btnCancelarE.on('click', limpiarOcultarEdicion);
tblEscuelas.delegate('.glyphicon-trash', 'click', eliminarEscuela);
tblEscuelas.delegate('.glyphicon-edit', 'click', seleccionarEscuela);
$('#liEditarEscuela').addClass('active');
