var btnAgregarNombre = $('#btnAgregarNombre'),
    btnCancelarNombre = $('#btnCancelarNombre'),
    txtNombreGrupo = $('#txtNombreGrupo'),
    txtNumeroGrupo = $('#txtNumeroGrupo'),
    btnAgregar = $('#btnAgregar'),
    btnCancelar = $('#btnCancelar'),
    txtNumero = $('#txtNumero'),
    numero = $('#numero'),
    nombre = $('#nombre'),
    i=0;

function agregarNombre(){
  i++;
  if(i == txtNumeroGrupo.val()){
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
          boxPoster.show().delay(1000).fadeOut();
      }

          if ( res.status === 'OK' ){
            icon = '<span class="glyphicon glyphicon-ok"></span> ';

          }else
            icon = '<span class="glyphicon glyphicon-remove"></span> ';

       messagePoster.html(icon + res.message);
     boxPoster.show().delay(1000).fadeOut();
    (nombre).hide();
    (numero).show();
    txtNumeroGrupo.val('');


  }else{
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
        boxPoster.show().delay(1000).fadeOut();
    }

        if ( res.status === 'OK' ){
          icon = '<span class="glyphicon glyphicon-ok"></span> ';

        }else
          icon = '<span class="glyphicon glyphicon-remove"></span> ';

     messagePoster.html(icon + res.message);
   boxPoster.show().delay(1000).fadeOut();
   txtNombreGrupo.val('');
 }
}





function cancelarNombre(){
txtNombreGrupo.val('');
}
function cancelarNumero(){
txtNumeroGrupo.val('');
}

function ocultar_y_validar(){

  if (txtNumeroGrupo.val()==="" || (isNaN(txtNumeroGrupo.val()))){
    alert("por favor ingresa un numero de grupos");
    txtNumeroGrupo.val('');
    return false;
  }
else
  (numero).hide();
  (nombre).show();

}


btnAgregarNombre.on('click', agregarNombre );
btnCancelarNombre.on('click', cancelarNombre);
$('#liAgregarGrupo').addClass('active');
btnAgregar.on('click', ocultar_y_validar);
btnCancelar.on('click', cancelarNumero);
