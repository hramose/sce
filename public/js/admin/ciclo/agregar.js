var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtCiclo = $('#txtCiclo');

function agregarCiclo(){


	var datos = $.ajax({
        url:'agregarCiclo',
        data: {
        	ciclo: txtCiclo.val()

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
		messagePoster.html('Error JSON ' + e);
		boxPoster.show().delay(2000).fadeOut();
}

if ( res.status === 'OK' ){
	icon = '<span class="glyphicon glyphicon-ok"></span> ';
	
}else
	icon = '<span class="glyphicon glyphicon-remove"></span> ';

messagePoster.html(icon + res.message);
boxPoster.show().delay(3000).fadeOut();
}


btnAgregar.on('click', agregarCiclo);
$('#liAgregarCiclo').addClass('active');
