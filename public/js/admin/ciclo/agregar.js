var btnAgregar = $('#btnAgregar'),
	btnCancelar = $('#btnCancelar'),
	txtCiclo = $('#txtCiclo');

function agregarCiclo(){
	alert(txtCiclo.val());

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
        messagePoster.html('Error JSON ');
        boxPoster.show().delay(2000).fadeOut();
    }

     messagePoster.html(icon + res.message);
	 boxPoster.show().delay(3000).fadeOut();
}


btnAgregar.on('click', agregarCiclo);
$('#liAgregarCiclo').addClass('active');