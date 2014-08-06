/* Nodos */
var btnBuscar = $('#btnBuscar'),
	txtBuscar = $('#txtBuscar');

	/* Tabla escuelas encontrados */
var tblEscuelas = $('#tblEscuelas'),
	tbodyEscuelas = $('#tbodyEscuelas');

/* Funciones */
function buscarEscuela(){

	if ( txtBuscar.val() === "" )
		return;

	var datos = $.ajax({
		url: 'buscarEscuela',
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

function eliminarEscuela(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar la escuela?');
	if ( del == false )
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

/* Eventos */
btnBuscar.on('click', buscarEscuela);
tblEscuelas.delegate('.glyphicon-trash', 'click', eliminarEscuela);
$('#liEditarEscuela').addClass('active');