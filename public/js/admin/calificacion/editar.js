var btnBuscar = $('#btnBuscar'),
    txtBuscar = $('#txtBuscar');
    btnCancelar = $('#btnCancelar');
    btnGuardar = $('#btnGuardar');

var sltIdentificador = $('#sltIdentificador'),
    sltAsignatura = $('#sltAsignatura'),
    sltBimestre = $('#sltBimestre'),
    txtCalificacion = $('#txtCalificacion'),
    sltProfesor = $('#sltProfesor');

var tblCalificacion = $('#tblCalificacion'),
    tbodyCalificacion = $('#tbodyCalificacion'),
    pnlEditarCal = $('#pnlEditarCal');

var calSeleccionda, calAsignatira, calIdentificador;
/* Funciones */
function buscarCalificacion(){
  if ( txtBuscar.val() === "" )
    return;

    var datos = $.ajax({
    url: 'buscarCalificacion',
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

    pnlEditarCal.addClass('hidden');
    tbodyCalificacion.html('');
    if ( res.status === 'OK' ){
      $.each(res.data, function(k,o){
        tbodyCalificacion.append(
          '<tr>'+
            '<td>'+o.aluApep+' '+o.aluApem+' '+o.aluNombre+'</td>'+
            '<td class="center">'+o.asigNombre+'</td>'+
            '<td class="center">'+o.calBimestre+'</td>'+
            '<td class="center">'+o.cicGrado+'</td>'+
            '<td class="center">'+o.cicCiclo+'</td>'+
            '<td class="center">'+
              '<span class="glyphicon glyphicon-edit" id="'+o.calId+'" '+		//id para editar
              'style="cursor:pointer" title="Editar"></span>'+
            '</td>'+
          '</tr>'
      );
      });
      tblCalificacion.removeClass('hidden');
    }
    else if(res.status === 'ERROR'){
        tblCalificacion.addClass('hidden');
        icon = '<span class="glyphicon glyphicon-remove"></span> ';
        messagePoster.html(icon+res.message);
        boxPoster.show().delay(3000).fadeOut();
        txtBuscar.val("");
      }
}
  /*********************************************************************/
function cancelarEdicion(){
  limpiarEdicion();
  pnlEditarCal.addClass('hidden');
}
function limpiarEdicion(){
  sltIdentificador.html('');
  sltAsignatura.html('');
  sltBimestre.val('');
  txtCalificacion.val('');
  sltProfesor.html('');
  txtBuscar.val('');
}

  /*********************************************************************/
function editarCalificacion(){
  var id = calSeleccionda;

  if(id === "")
    return false;

  if ( !validarCalificacion() )
    return false;

  var datos = $.ajax({
    url: 'editarCalificacion',
    data: {
      id: id,
      calificacion: txtCalificacion.val(),  /*solo estos campos se podra editar*/
      profesor: sltProfesor.val(),
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
    cancelarEdicion();
    }else
    icon = '<span class="glyphicon glyphicon-remove"></span> ';

    messagePoster.html(icon + res.message);
    boxPoster.show().delay(3000).fadeOut();
}
  /*********************************************************************/
function seleccionarCalificacion() {
  var id = $(this).attr('id');
  if ( id === "")
    return false;

    calSeleccionda = id;
    var datos = $.ajax({
      url: 'getEditarCal',
      data: {
        id: calSeleccionda
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

    if (res.status === 'OK'){
      limpiarEdicion();
      var cal = res.data.calificacion,
        prof = res.data.profesores;

      $.each(prof, function(k,datos){
            sltProfesor.append(
              '<option value="'+datos.profCurp+'">'+datos.profNombre+'</option>'
            );
      });
      /*Para evitar que edite los siguientes campos solo aparecera el que contiene el registro dentro de calificacion*/
      sltAsignatura.val(cal.asigNombre);  //no se necesita el id ya que no se modificaran
      sltIdentificador.val(cal.aluApep+' '+cal.aluApem+' '+cal.aluNombre);
      sltBimestre.val(cal.calBimestre);
      /*------------------------------------------*/
      txtCalificacion.val(cal.calCalificacion);

      sltProfesor.find('option').each(function(){
        if ( cal.calProfesor == $(this).val() )
          sltProfesor.val(cal.calProfesor);
      });

      pnlEditarCal.removeClass('hidden');
      tblCalificacion.addClass('hidden');
    }
}
  /**************************************************************************/
function validarCalificacion(){
  if ( sltIdentificador.val() === "" || sltIdentificador.val()=== null ){
    alert('Seleccione un alumno');
    sltIdentificador.focus();
    return false;
  }
  if ( sltAsignatura.val() === "" || sltAsignatura.val()=== null ){
    alert('Seleccione un asignatura');
    sltAsignatura.focus();
    return false;
  }
  if ( sltBimestre.val() === "" || sltBimestre.val()=== null ){
    alert('Seleccione un bimestre');
    sltBimestre.focus();
    return false;
  }
  if ( txtCalificacion.val() === "" ){
    alert('Indique una calificación');
    txtCalificacion.focus();
    return false;
  }
  if ( sltProfesor.val() === "" || sltProfesor.val()=== null ){
    alert('Seleccione un profesor');
    sltProfesor.focus();
    return false;
  }
  return true;
}

/* Eventos */
btnBuscar.on('click', buscarCalificacion);
btnCancelar.on('click', cancelarEdicion);
btnGuardar.on('click', editarCalificacion);
tblCalificacion.delegate('.glyphicon-edit', 'click', seleccionarCalificacion);
$('#liEditarCalificacion').addClass('active');
