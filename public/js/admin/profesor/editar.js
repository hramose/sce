/* Nodos */
var btnBuscar = $('#btnBuscar'),
	txtBuscar = $('#txtBuscar');

	/* Tabla profesores encontrados */
var tblProfesor = $('#tblProfesor'),
	tbodyProfesor = $('#tbodyProfesor');


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
    					'<span class="glyphicon glyphicon-edit" id="'+o.profCurp+'" '+
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
}
/*
function eliminarAlumno(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar al alumno');
	if ( del == false )
		return false;

	var datos = $.ajax({
		url: 'eliminarAlumno',
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
*/
/* Eventos */
btnBuscar.on('click', buscarProfesor);
//tblProfesor.delegate('.glyphicon-trash', 'click', eliminarAlumno);
$('#liEditarProfesor').addClass('active');