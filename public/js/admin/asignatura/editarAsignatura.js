/* Nodos */

var btnBuscar = $('#btnBuscar'),
    txtBuscar = $('#txtBuscar');
    btnCancelar = $('#btnCancelar');
    btnGuardar = $('#btnGuardar');

	/* Tabla asignaturas encontradas */
var tblAsignatura = $('#tblAsignatura'),
    tbodyAsignatura = $('#tbodyAsignatura');

	/*Formulario datos a editar*/
var formEditar = $('#formEditar'),
 	txtId = $('#txtId'),
	txtNombre = $('#txtNombre'),
	sltEstado = $('#sltEstado');
var asigSeleccionada;

/* Funciones */

function buscarAsignatura(){

	if ( txtBuscar.val() === "" )
		return;

		var datos = $.ajax({
		url: 'buscarAsignatura',
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

    formEditar.addClass('hidden');
    tbodyAsignatura.html('');
    if ( res.status === 'OK' ){
    	$.each(res.data, function(k,o){
    		if ( o.asigEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyAsignatura.append(
    			'<tr>'+
    				'<td>'+o.asigId+'</td>'+
    				'<td>'+o.asigNombre+'</td>'+
    				'<td class="center">'+status+'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-edit" id="'+o.asigId+'" '+		/*id para editar*/
    					'style="cursor:pointer" title="Editar"></span>'+
					'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-trash" id="'+o.asigId+'" '+
    					'style="cursor:pointer" title="Eliminar"></span>'+
					'</td>'+
    			'</tr>'
			);
    	});
    }else
    	tbodyAsignatura.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');

	tblAsignatura.removeClass('hidden');
}

function cancelarEdicion(){
	txtId.val("");
	txtNombre.val("");
	sltEstado.val("");
	txtBuscar.val("");
	formEditar.addClass('hidden');
}

function editarAsignatura(){
	var id = asigSeleccionada;
  	if(id === "")
    return false;

  	var datos = $.ajax({
    url: 'editarAsignatura',
    data: {
      id:id,    
      idNueva: txtId.val(),
      nombre: txtNombre.val(),
      estado: sltEstado.val()
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
    cancelarEdicion();
    buscarAsignatura();
  	}else
    icon = '<span class="glyphicon glyphicon-remove"></span> ';

  	messagePoster.html(icon + res.message);
  	boxPoster.show().delay(3000).fadeOut();
}

function eliminarAsignatura(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar la asignatura');
	if ( del === false )
		return false;

	var datos = $.ajax({
		url: 'eliminarAsignatura',
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
    	buscarAsignatura();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';

    messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
}

function seleccionarAsignatura() {
	var id = $(this).attr('id');
	if ( id === "")
		return false;

		asigSeleccionada = id;
		var datos = $.ajax({
			url: 'seleccionarAsignatura',
			data: {
				id: asigSeleccionada
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
					$.each(res.data, function(k,datos){
						txtId.val(datos.asigId);
						txtNombre.val(datos.asigNombre);
						sltEstado.val(datos.asigEstado);
					});
			 		formEditar.removeClass('hidden');
			 		tblAsignatura.addClass('hidden');
		}
	}

/* Eventos */

btnBuscar.on('click', buscarAsignatura);
btnCancelar.on('click', cancelarEdicion);
btnGuardar.on('click', editarAsignatura);
                       /*(elemento, evento, funcion js) */
tblAsignatura.delegate('.glyphicon-trash', 'click', eliminarAsignatura);
tblAsignatura.delegate('.glyphicon-edit', 'click', seleccionarAsignatura);
$('#liEditarAsignatura').addClass('active');
