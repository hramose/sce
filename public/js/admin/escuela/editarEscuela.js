/* Nodos */
var btnBuscarE = $('#btnBuscarE'),
	txtBuscarE = $('#txtBuscarE');

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
		slctTurnoE = $('#slctTurnoE'),
		slctEstadoE = $('#slctEstadoE');

var escuelaSeleccionada;

function buscarEscuela(){
	if ( txtBuscarE.val() === "" )
		return;

	var datos = $.ajax({
		url: 'buscarEscuela',
		data: {
			buscar: txtBuscarE.val()
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

    tbodyEscuelas.html('');
    if ( res.status === 'OK' ){
		 	var i = 1;
    	$.each(res.data, function(k,o){
    		if ( o.escEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyEscuelas.append(
    			'<tr>'+
    				'<td>'+o.escId+'</td>'+
    				'<td>'+o.escNombre+'</td>'+
    				'<td>'+o.escZona+'</td>'+
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
    }else
    	tbodyEscuelas.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');

	tblEscuelas.removeClass('hidden');
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
function guardarCambios(){
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
			turno: slctTurnoE.val(),
			estado: slctEstadoE.val()
		},
		type: 'post',
		dataType:'json',
		async:false
	}).error(function(e){
			alert('Ocurrio un error, intente de nuevo');
	}).responseText;

	var resultadoConsulta;
	try{
			resultadoConsulta = JSON.parse(editar);
	}catch (e){
			messagePoster.html('Error JSON ' + e);
			boxPoster.show().delay(2000).fadeOut();
	}

	if ( resultadoConsulta.status === 'OK' ){
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarOcultarEdicion();
		buscarEscuela();		/*Para actualizar datos que se muestran dentro del cuerpo de tabla*/
	}else
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon + resultadoConsulta.message);
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
	slctTurnoE.val("");
	slctEstadoE.val("");
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

		var resConsulta;
		try{
				resConsulta = JSON.parse(datos);

				}catch(e){
				messagePoster.html('Error JSON ' + e);
				boxPoster.show().delay(2000).fadeOut();
			}

		if(resConsulta.status === 'OK'){
			$.each(resConsulta.data, function(k,info){
				txtIdE.val(info.escId);
				txtNombreE.val(info.escNombre);
				txtZonaE.val(info.escZona);
				txtDireccionE.val(info.escDireccion);
				txtTelefonoE.val(info.escTelefono);
				txtDirectorE.val(info.escDirector);
				slctTurnoE.val(info.escTurno);
				slctEstadoE.val(info.escEstado);

			});
			formEditarE.removeClass('hidden');
			btnCancelarE.focus();
		}
}

/*function sc(){
	alert("editar escuela");
}*/

/* Eventos */
btnBuscarE.on('click', buscarEscuela);
btnGuardarE.on('click', guardarCambios);
btnCancelarE.on('click', limpiarOcultarEdicion);
tblEscuelas.delegate('.glyphicon-trash', 'click', eliminarEscuela);
tblEscuelas.delegate('.glyphicon-edit', 'click', seleccionarEscuela);
$('#liEditarEscuela').addClass('active');
//$('#liEditarEscuela').on('click',sc);
