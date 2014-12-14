var btnSeleccionarAlumno = $('#btnSeleccionarAlumno');
var sltCiclo = $('#sltCiclo'),
    sltGrupo = $('#sltGrupo'),
    pnlProfesorAsignatura = $('#pnlProfesorAsignatura'),
    txtNAsignatura = $('#txtNAsignatura');

var formSelect = $('#formSelect'),
    sltGrupo2 = $('#sltGrupo2');

function getCiclos(){
  var datos = $.ajax({
    url: '../ciclo/getCiclos',
    type: 'get',
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

  if ( res.length > 0 ){
    sltCiclo.html('');
    $.each(res, function(k,v){
      sltCiclo.append(
        '<option value="'+v.cicCiclo+'">'+v.cicCiclo+'</option>'  /* cicCiclo en value, ya que se agrupa y existen muchos cicCiclo*/
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
    'No existen ciclos registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}

/************************************************************************/
function getGrupos(){
  var datos = $.ajax({
    url: '../ciclo/getGrupos',
    type: 'get',
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

  if ( res.length > 0 ){
    sltGrupo.html('');
    $.each(res, function(k,v){
      sltGrupo.append(
        '<option value="'+v.grupId+'">'+v.grupNombre+'</option>'
      );
    });
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
    'No existen grupos registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}

/****************************************************************/
function profesorAsignatura(){
   var numeroAsignatura = txtNAsignatura.val();

   sltGrupo2.html('');
   formSelect.html('');
   var i;
  for (i=0; i<numeroAsignatura; i++){
     sltGrupo2.append(
       '<option value="2">12</option>'
     );

     var n = i+1;
     formSelect.append(
       '<div class="form-group">'+
       '<label for="sltGrado" class="col-md-1 control-label">'+n+'</label>'+
       '<div class="col-md-5">'+
          '<select id="sltGrupo2" class="form-control col-md-4 input-sm"></select>'+
       '</div>'+
       '<div class="col-md-5">'+
          '<select id="sltGrupo2" class="form-control col-md-4 input-sm"></select>'+
       '</div></div>'
     );

   }
   alert(numeroAsignatura);
}

/*********************************************************************/
$(document).on('ready', function(){
  getCiclos();
  getGrupos();
});



$('#liAsignarProfesor').addClass('active');
btnSeleccionarAlumno.on('click', profesorAsignatura);
