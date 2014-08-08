/* Nodos */
var btnBuscar = $('#btnBuscar'),
	txtBuscar = $('#txtBuscar');

	/* Tabla profesores encontrados */
var tblProfesor = $('#tblProfesor'),
	tbodyProfesor = $('#tbodyProfesor');

	/*Formulario datos a editar*/
var formEditar = $('#formEditar'),
		txtCurpP = $('#txtCurpP'),
		txtNombreP = $('#txtNombreP'),
		txtPerfilP = $('#txtPerfilP'),
		txtTelefonoP = $('#txtTelefonoP'),
		txtDireccionP = $('#txtDireccionP'),
		slctEstadoP = $('#slctEstadoP'),
		slctOrientadorP = $('#slctOrientadorP'),
		btnCancelarP = $('#btnCancelarP'),
		btnGuardarP = $('#btnGuardarP');

	/*variable almacena el id del profesor a editar*/
var profesorSeleccionado;

	/****************************************************************************/
	/*al presionar boton buscar muestra tabla con datos relevantes*/
function buscarProfesor(){

	if ( txtBuscar.val() === "" )
		return;

		var datos = $.ajax({
		url: 'buscarProfesor',
		data: {
			buscar: txtBuscar.val()
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

    tbodyProfesor.html('');
    if ( res.status === 'OK' ){
    	var i = 1;
    	$.each(res.data, function(k,o){
    		if ( o.profEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyProfesor.append(
    			'<tr>'+
    				'<td class="center">'+i+'</td>'+
    				'<td>'+o.profCurp+'</td>'+
    				'<td>'+o.profNombre+'</td>'+
    				'<td>'+o.profPerfil+'</td>'+
    				'<td class="center">'+o.profTelefono+'</td>'+
    				'<td class="center">'+status+'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-edit" id="'+o.profCurp+'" '+		/*id para editar*/
    					'style="cursor:pointer" title="Editar"></span>'+
					'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-trash" id="'+o.profCurp+'" '+
    					'style="cursor:pointer" title="Eliminar"></span>'+
					'</td>'+
    			'</tr>'
			);
			i++;
    	});
    }else
    	tbodyProfesor.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');

	tblProfesor.removeClass('hidden');
	limpiarOcultarEdicion();
}

	/***********************************************************************************/
function eliminarProfesor(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar al profesor');
	if ( del === false )
		return false;

	var datos = $.ajax({
		url: 'eliminarProfesor',
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
    	buscarProfesor();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';

    messagePoster.html(icon + res.message);
	  boxPoster.show().delay(3000).fadeOut();
}

	/********************************************************************************************/
function guardarCambios(){
	var id = profesorSeleccionado;	/*id = curp profesor seleccionado en vista, icono editar en tabla*/
	if ( id === "")
		return false;

	var verificar = new ValidarDatos();	/*crea objeto desde ValidarDatos.js*/
	var validar = verificar.validaInfo(txtCurpP.val(),
												txtNombreP.val(),
												txtPerfilP.val(),
												txtTelefonoP.val(),
												txtDireccionP.val());
	if ( !validar)
		return false;

	var datos = $.ajax({
		url: 'editarProfesor',
		data: {
			id: id,
			curp: txtCurpP.val(),
			nombre: txtNombreP.val(),
			perfil: txtPerfilP.val(),
			telefono: txtTelefonoP.val(),
			direccion: txtDireccionP.val(),
			orientador: slctOrientadorP.val(),
			estado: slctEstadoP.val()
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
		limpiarOcultarEdicion();
		buscarProfesor();		/*Para actualizar datos que se muestran dentro del cuerpo de tabla*/
	}else
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();

}

/************************************************************************************/
function limpiarOcultarEdicion(){
	txtCurpP.val("");
	txtNombreP.val("");
	txtPerfilP.val("");
	txtTelefonoP.val("");
	txtDireccionP.val("");
	slctEstadoP.val("");
	slctOrientadorP.val("");
	formEditar.addClass('hidden');
}

	/************************************************************************************************/
	/*Al presionar elemento .glyphicon-edit de una fila de la tabla */
function seleccionarProfesor() {
	var id = $(this).attr('id');
	if ( id === "")
		return false;

		profesorSeleccionado = id;
		var datos = $.ajax({
			url: 'seleccionarProfesor',
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

		if (res.status === 'OK'){
					$.each(res.data, function(k,info){	/*recorre datos de consulta*/
						txtCurpP.val(info.profCurp);			/*asignan datos a elementos html*/
						txtNombreP.val(info.profNombre);
						txtPerfilP.val(info.profPerfil);
						txtTelefonoP.val(info.profTelefono);
						txtDireccionP.val(info.profDireccion);
						slctEstadoP.val(info.profEstado);
						slctOrientadorP.val(info.profOrientador);
					});
			 		formEditar.removeClass('hidden');
					btnCancelarP.focus();		/*para apreciar en pantalla formulario editor*/
		}
	}

/* Eventos */
btnBuscar.on('click', buscarProfesor);
btnCancelarP.on('click',limpiarOcultarEdicion);
btnGuardarP.on('click',guardarCambios);
tblProfesor.delegate('.glyphicon-trash', 'click', eliminarProfesor);	/*funcion cuando se producen eventos...*/
tblProfesor.delegate('.glyphicon-edit', 'click', seleccionarProfesor);		/*...(elemento, evento, funcion js) */
$('#liEditarProfesor').addClass('active');
