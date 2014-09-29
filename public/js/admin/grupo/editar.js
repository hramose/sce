/* Nodos */
var btnBuscarG = $('#btnBuscarG'),
    txtBuscarG = $('#txtBuscarG');

var btnGuardarG = $('#btnGuardarG'),
    btnCancelarG = $('#btnCancelarG');

  /* Tabla grupos encontrados */
var tblGrupo = $('#tblGrupo'),
    tbodyGrupo = $('#tbodyGrupo');

  /*formulario muestra datos a editar*/
var formEditarG = $('#formEditarG'),
    txtId = $('#txtId'),
    txtNombreG = $('#txtNombreG'),
    slctEstadoG = $('#slctEstadoG');

var grupoSeleccionada;

function buscarGrupo(){

  var datos = $.ajax({
    url: 'buscarGrupo',
    data: {
      buscar: 'null'	/*retorna todo contenido de tabla*/
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

    tbodyGrupo.html('');
    if ( res.status === 'OK' ){

       var i = 1;
      $.each(res.data, function(k,o){
        if ( o.grupEstado == 1 )
          status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
        else
          status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';


        tbodyGrupo.append(
          '<tr>'+
            '<td>'+o.grupNombre+'</td>'+
            '<td class="col-md-2">'+status+'</td>'+
            '<td class="center">'+
              '<span class="glyphicon glyphicon-edit" id="'+o.grupId+'" '+
              'style="cursor:pointer" title="Editar"></span>'+
        '</td>'+
            '<td class="center">'+
              '<span class="glyphicon glyphicon-trash" id="'+o.grupId+'" '+
              'style="cursor:pointer" title="Eliminar"></span>'+
          '</td>'+
          '</tr>'
      );
      i++;
      });
    }else{
      messagePoster.html('No se encotraron Grupos');
      boxPoster.show().delay(2000).fadeOut();
      tbodyGrupo.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');
}
  tblGrupo.removeClass('hidden');
  limpiarOcultarEdicion();
}

  /****************************************************************************/
function eliminarGrupo(){
  var id = $(this).attr('id');
  if ( id === "" )
    return false;

  var del = confirm('¿Está seguro que desea eliminar el grupo?');
  if ( del === false )
    return false;

  var datos = $.ajax({
    url: 'eliminarGrupo',
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
      buscarGrupo();
    }else
      icon = '<span class="glyphicon glyphicon-remove"></span> ';

    messagePoster.html(icon + res.message);
  boxPoster.show().delay(3000).fadeOut();
  buscarGrupo();
}

    /**************************************************************************/
function guardarCambios(){
  if(grupoSeleccionada === "")	/*grupoSeleccionada variable global, se le asigna valor en funcion seleccionarGrupo*/
    return false;

  var editar = $.ajax({
    url: 'editarGrupo',
    data: {
      id: grupoSeleccionada,		/*id=ct actual, id dentro de BD a buscar*/
      nombre: txtNombreG.val(),
      estado: slctEstadoG.val()
    },
    type: 'post',
    dataType:'json',
    async:false
  }).error(function(e){
      alert('Ocurrio un error, intente de nuevo');
  }).responseText;

  var resultadoConsulta;
  try{
      resultadoConsulta = JSON.parse(editar);
  }catch (e){
      messagePoster.html('Error JSON ' + e);
      boxPoster.show().delay(2000).fadeOut();
  }

  if ( resultadoConsulta.status === 'OK' ){
    icon = '<span class="glyphicon glyphicon-ok"></span> ';
    limpiarOcultarEdicion();
    buscarGrupo();		/*Para actualizar datos que se muestran dentro del cuerpo de tabla*/
  }else
    icon = '<span class="glyphicon glyphicon-remove"></span> ';

  messagePoster.html(icon + resultadoConsulta.message);
  boxPoster.show().delay(3000).fadeOut();

}

    /**************************************************************************/
function limpiarOcultarEdicion(){
  txtId.val("");
  txtNombreG.val("");

  formEditarG.addClass('hidden');
}

    /**************************************************************************/
function seleccionarGrupo(){
    var id = $(this).attr('id');
    if (id==="")
      return false;
    grupoSeleccionada = id;

    var datos = $.ajax({
      url: 'seleccionarGrupo',
      data: {
        id: grupoSeleccionada
      },
      type: 'post',
      dataType:'json',
      async:false
    }).error(function(e){
      alert('Ocurrio un error, intente de nuevo');
    }).responseText;

    var resConsulta;
    try{
        resConsulta = JSON.parse(datos);

        }catch(e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
      }

    if(resConsulta.status === 'OK'){
      $.each(resConsulta.data, function(k,info){
        txtId.val(info.grupId);
        txtNombreG.val(info.grupNombre);
        slctEstadoG.val(info.grupEstado);

      });
      formEditarG.removeClass('hidden');
      btnCancelarG.focus();
    }
}


/* Eventos */


$(document).on('ready', function(){
  buscarGrupo();
  getTurnos();
});
$('#liEditarGrupo').addClass('active');
btnBuscarG.on('click', buscarGrupo);
btnGuardarG.on('click', guardarCambios);
btnCancelarG.on('click', limpiarOcultarEdicion);
tblGrupo.delegate('.glyphicon-trash', 'click', eliminarGrupo);
tblGrupo.delegate('.glyphicon-edit', 'click', seleccionarGrupo);
