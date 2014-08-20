var btnAgregarNombre = $('#btnAgregarNombre'),
    btnCancelarNombre = $('#btnCancelarNombre'),
    txtNombreGrupo = $('#txtNombreGrupo'),
    txtNumeroGrupo = $('#txtNumeroGrupo'),
    btnAgregar = $('#btnAgregar'),
    btnCancelar = $('#btnCancelar'),
    txtNumero = $('#txtNumero'),
    numero = $('#numero'),
    nombre = $('#nombre'),
    i=1;


/*Funciones*/
function agregarNombre(){

  if(txtNumeroGrupo.val() > i ){

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
   ++i
   }
   else{

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

      txtNombreGrupo.val('');
      txtNombreGrupo.val('');
      txtNumeroGrupo.val('');
      (numero).show();
      cancelarNumero();
 }
}


  function cancelarNombre(){

    txtNombreGrupo.val('');
    (nombre).hide();
    (numero).show();
    txtNumeroGrupo.val('');
    btnCancelar.prop( "disabled", false );
    btnAgregar.prop( "disabled", false );
    txtNumeroGrupo.prop( "disabled", false );
}


  function cancelarNumero(){
    txtNumeroGrupo.val('');
    txtNumeroGrupo.prop( "disabled", false ); // habilita el text txtNumeroGrupo
    btnCancelar.prop( "disabled", false );  // habilita el boton btnCancelar
    btnAgregar.prop( "disabled", false );  // habilita el boton btnAgregar
    (nombre).hide();
    i=1;
}

  function ocultarYValidar(){

    if (txtNumeroGrupo.val()==="" || (isNaN(txtNumeroGrupo.val())) || txtNumeroGrupo.val() === 0 ) // valida si txtNumeroGrupo si esta vacio, que deba de ser numero y que sea distinto de cero
      {
      alert("por favor ingresa un numero de grupos");
      txtNumeroGrupo.val('');
      return false;
    }
  else
    btnCancelar.prop( "disabled", true );  // desabilita el boton btnCancelar
    btnAgregar.prop( "disabled", true );    // desabilita el boton btnAgregar
    txtNumeroGrupo.prop( "disabled", true ); // desabilita el text txtNumeroGrupo
    (numero).show();
    (nombre).show();

}

//Eventos
btnAgregarNombre.on('click', agregarNombre );
btnCancelarNombre.on('click', cancelarNombre);
$('#liAgregarGrupo').addClass('active');
btnAgregar.on('click', ocultarYValidar);
btnCancelar.on('click', cancelarNumero);
