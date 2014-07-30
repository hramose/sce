/* Nodos */
var btnAgregar = $('#btnAgregarP'),
	btnCancelar = $('#btnCancelarP'),
	txtCurpP = $('#txtCurpP'),
	txtNombreP = $('#txtNombreP'),
	txtPerfilP = $('#txtPerfilP'),
	txtTelefonoP = $('#txtTelefonoP'),
	txtDireccionP = $('#txtDireccionP'),
	txtOrientadorP = $('#txtOrientadorP');

/* Funciones */
function agregarProfesor(){
	if ( !validarProfesor() )
		return false;

	var datos = $.ajax({
        url:'agregarProfesor',
        data: {
        	curp: txtCurpP.val(),
        	nombre: txtNombreP.val(),
        	perfil: txtPerfilP.val(),
        	telefono: txtTelefonoP.val(),
        	direccion: txtDireccionP.val(),
        	orientador: txtOrientadorP.val()
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
        messagePoster.html('Error JSON ');
        boxPoster.show().delay(2000).fadeOut();
    }

    if ( res.status === 'OK' ){
    	icon = '<span class="glyphicon glyphicon-ok"></span> ';
    	limpiarProfesor();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';
    
    messagePoster.html(icon + res.message);
	 boxPoster.show().delay(3000).fadeOut();
}

function limpiarProfesor(){
	txtCurpP.val('');
	txtNombreP.val('');
	txtPerfilP.val('');
	txtTelefonoP.val('');
	txtDireccionP.val('');
	txtOrientadorP.val('');
}

function validarProfesor(){
	if ( txtCurpP.val() === "" || txtCurpP.val().length < 18 ){
		alert('Indique una CURP válida');
		txtCurpP.focus();
		return false;
	}
	if ( txtNombreP.val() === "" ){
		alert('Indique el nombre del profesor');
		txtNombreP.focus();
		return false;
	}
	if ( txtPerfilP.val() === "" ){
		alert('Indique el perfil del profesor');
		txtPerfilP.focus();
		return false;
	}
	if ( txtTelefonoP.val() === "" ){
		alert('Indique el teléfono del profesor');
		txtTelefonoP.focus();
		return false;
	}
	if ( txtDireccionP.val() === "" ){
		alert('Indique la dirección del profesor');
		txtDireccionP.focus();
		return false;
	}
	return true;
}

/* Eventos */
btnAgregar.on('click', agregarProfesor);
btnCancelar.on('click', limpiarProfesor);
$('#liAgregarProfesor').addClass('active');