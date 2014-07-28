/* Nodos */
var btnBuscar = $('#btnBuscar'),
	txtBuscar = $('#txtBuscar');

	/* Tabla alumnos encontrados */
var tblAlumnos = $('#tblAlumnos'),
	tbodyAlumnos = $('#tbodyAlumnos');

/* Funciones */
function buscarAlumno(){

	if ( txtBuscar.val() === "" )
		return;

	var datos = $.ajax({
		url: 'buscarAlumno',
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

    tbodyAlumnos.html('');
    if ( res.status === 'OK' ){
    	var i = 1;
    	$.each(res.data, function(k,o){
    		if ( o.aluEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyAlumnos.append(
    			'<tr>'+
    				'<td class="center">'+i+'</td>'+
    				'<td>'+o.aluCurp+'</td>'+
    				'<td>'+o.aluApep+' '+o.aluApem+' '+o.aluNombre+'</td>'+
    				'<td>'+o.aluTutor+'</td>'+
    				'<td class="center">'+o.aluTelefono+'</td>'+
    				'<td class="center">'+status+'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-edit" id="'+o.aluCurp+'" '+
    					'style="cursor:pointer" title="Editar"></span>'+
					'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-trash" id="'+o.aluCurp+'" '+
    					'style="cursor:pointer" title="Eliminar"></span>'+
					'</td>'+
    			'</tr>'
			);
			i++;
    	});
    }else
    	tbodyAlumnos.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');

	tblAlumnos.removeClass('hidden');
}

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
    	buscarAlumno();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';
    
    messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
}

/* Eventos */
btnBuscar.on('click', buscarAlumno);
tblAlumnos.delegate('.glyphicon-trash', 'click', eliminarAlumno);
$('#liEditarAlumno').addClass('active');