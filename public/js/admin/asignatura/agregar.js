/* Nodos */
var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtClave = $('#txtClave'),
	txtNombre = $('#txtNombre'),
	sltArea = $('#sltArea');

/* Funciones */
function agregarAsignatura(){
	var verificar = new validar();
	var validarAsignatura = verificar.validarDatos(txtNombre.val(),txtClave.val());
	if ( !validarAsignatura ) 
		return false;

	var validNombre = txtNombre.val();
 	var idNombreSinEI = validNombre.replace(/\s/g,''); //se utiliza en obtencion de estadísticas para obtener el nombre de materias sin espacio alguno
        
	var datos = $.ajax({
		url: 'agregarAsignatura',
		data: {
			clave: txtClave.val(),
			nombre: txtNombre.val(),
			idNombre: idNombreSinEI,
			area: sltArea.val()
		},
		type: 'post',
		dataType: 'json',
		async: false
	}).error(function(e){
		alert('Ocurrio un error, intente de nuevo');
	}).responseText;
	
	var res;
	try{
		res = JSON.parse(datos);
	}catch(e){
		messagePoster.html('Error JSON' + e);
		boxPoster.show().delay(2000).fadeOut();	
	}

	if ( res.status === 'OK') {
		icon = '<span class="glyphicon glyphicon-ok"></span> ';
		limpiarAsignatura();
	}else 
		icon = '<span class="glyphicon glyphicon-remove"></span> ';

	messagePoster.html(icon+res.message);
	boxPoster.show().delay(3000).fadeOut();
} 

function limpiarAsignatura(){
	txtClave.val('');
	txtNombre.val('');
}

function validar(){
	this.validarDatos = function validarDatos( nombre, clave ){
		var patt = new RegExp( '^[á-úÁ-Úa-zA-Z \t]*$' );
		//var patt = new RegExp('^[á-úa-z(ñ)]*$', 'i');
		if( txtNombre.val() ==="" || !patt.test(txtNombre.val()) ){
			alert('Indique un nombre válido de asignatura');
			txtNombre.focus();
			return false;
		}
		
		var patt = new RegExp( '^[0-9]*$' );
		if( !patt.test(txtClave.val()) || txtClave.val().length > 10 ){
			alert('Indique una clave válida de asignatura');
			txtClave.focus();
			return false;
		}	
		return true;	
	};
}

/* Eventos */
btnAgregar.on('click', agregarAsignatura);
btnCancelar.on('click', limpiarAsignatura);
$('#liAgregarAsignatura').addClass('active');