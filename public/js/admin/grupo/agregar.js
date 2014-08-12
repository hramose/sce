var btnAgregar = $('#btnAgregar'),
    btnCancelar = $('#btnCancelar'),
    btnAgregarNombre = $('#btnAgregarNombre'),
    btnCancelarNombre = $('#btnCancelarNombre'),
    txtNombreGrupo = $('#txtNombreGrupo');


function agregarNombre(){
    alert(txtNombreGrupo.val());
  var datos = $.ajax({
        url:'agregarGrupo',
        data: {
          grupo: txtNombreGrupo.val()

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

        }else
          icon = '<span class="glyphicon glyphicon-remove"></span> ';

     messagePoster.html(icon + res.message);
   boxPoster.show().delay(3000).fadeOut();
}

function cancelarNombre(){
txtNombreGrupo.val('');
}

//btnAgregar.on('click', agregar);
//btnCancelar.on('click',cancelar);
btnAgregarNombre.on('click', agregarNombre);
btnCancelarNombre.on('click', cancelarNombre);
$('#liAgregarGrupo').addClass('active');
