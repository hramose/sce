var txtNumero = $('#txtNumero'),
    txtNombreGrupo = $('#txtNombreGrupo'),
    nombreGrupo = $('#nombreGrupo'),
    nombre = $('#nombre'),
    btnAgregarNombre = $('#btnAgregarNombre'),
    btnCancelarNombre = $('#btnCancelarNombre');
  

/*Funciones*/
function agregar(){

        if ( !validar() )
          return false;
        
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

function cancelar () {
       txtNombreGrupo.val('');
}


function validar(){
      var expre = /^[^a-zA-Z0-9]/;
   if ( !txtNombreGrupo.val().search(expre) || txtNombreGrupo.val()==''){
    alert("ingresa un nombre para el grupo, por favor");
    txtNombreGrupo.val('');
    return false;
  }
  return true;
}




//Eventos
btnAgregarNombre.on('click',agregar);
btnCancelarNombre.on('click',cancelar);
$('#liAgregarGrupo').addClass('active');

