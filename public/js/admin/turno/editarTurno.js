/* Nodos */
var btnBuscar = $('#btnBuscar'),
	txtBuscar = $('#txtBuscar');

	/* Tabla turnos encontrados */
var tblTurnos = $('#tblTurnos'),
	tbodyTurnos = $('#tbodyTurnos');

/* Funciones */
function buscarTurno(){

	if ( txtBuscar.val() === "" )
		return;

	var datos = $.ajax({
		url: 'buscarTurno',
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

    tbodyTurnos.html('');
    if ( res.status === 'OK' ){
    	var i = 1;
    	$.each(res.data, function(k,o){
    		if ( o.turEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyTurnos.append(
    			'<tr>'+
    				'<td>'+o.turId+'</td>'+
    				'<td>'+o.turNombre+'</td>'+
    				'<td class="center">'+status+'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-edit" id="'+o.turId+'" '+
    					'style="cursor:pointer" title="Editar"></span>'+
					'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-trash" id="'+o.turId+'" '+
    					'style="cursor:pointer" title="Eliminar"></span>'+
					'</td>'+
    			'</tr>'
			);
			i++;
    	});
    }else
    	tbodyTurnos.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');

	tblTurnos.removeClass('hidden');
}

function eliminarTurno(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar el turno?');
	if ( del == false )
		return false;

	var datos = $.ajax({
		url: 'eliminarTurno',
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
    	buscarTurno();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';
    
    messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
}

function seleccionarTurno() {   
    var id = $(this).attr('id');
    if ( id === "")
        return false;

        var datos = $.ajax({
            url: 'seleccionarTurno',
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
                    $.each(res.data, function(k,datos){ 
                        txtId.val(datos.turId);           
                        sltNombre.val(datos.turNombre);
                        sltEstado.val(datos.turEstado); 
                    });
                    formEditar.removeClass('hidden');
        } 
    }

/* Eventos */
btnBuscar.on('click', buscarTurno);
tblTurnos.delegate('.glyphicon-trash', 'click', eliminarTurno);
tblTurnos.delegate('.glyphicon-edit', 'click', seleccionarTurno);
$('#liEditarTurno').addClass('active');