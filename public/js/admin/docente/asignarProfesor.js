var btnSeleccionarAlumno = $('#btnSeleccionarAlumno');
var sltCiclo = $('#sltCiclo'),
    sltGrado = $('#sltGrado'),
    sltGrupo = $('#sltGrupo'),
    pnlProfesorAsignatura = $('#pnlProfesorAsignatura'),
    txtNAsignatura = $('#txtNAsignatura'),
    btnSeleccionarCiclo = $('#btnSeleccionarCiclo');

var pnlProfesorAsignatura = $('#pnlProfesorAsignatura'),
    formSelect = $('#formSelect'),
    sltAsignatura = $('#sltAsignatura'),
    sltProfesor = $('#sltProfesor'),
    btnAgregar = $('#btnAgregar'),
    btnCancelar = $('#btnCancelar');

var idCiclosT;

    /***********************************************************************/
function asignarProfesorAsignatura(){
  //if ( !validarCalificacion() )
    //return false;

  var sltProfesorAll = document.querySelectorAll("#sltProfesor"); /*crea arreglo de todos los elementos con el mismo id*/
  var sltAsignaturaAll = document.querySelectorAll("#sltAsignatura");
  var nSltProf =  sltProfesorAll.length;

  for(var i=0 ; i<nSltProf; i++){
    var profesorId = sltProfesorAll[i].value;   //valor del elemento elejido de cada select select
    var asignaturaId = sltAsignaturaAll[i].value;

    var datos = $.ajax({
      url: 'asignarProfAsig',
      data: {
        ciclo: idCiclosT,
        profesor: profesorId,
        asignatura: asignaturaId
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
      cancelar();
    }else
      icon = '<span class="glyphicon glyphicon-remove"></span> ';

      messagePoster.html(icon + res.message);
      boxPoster.show().delay(3000).fadeOut();
  }

}

    /********************************************************************/
function cancelar(){
  formSelect.html('');
  pnlProfesorAsignatura.addClass('hidden');
}
    /**********************************************************************/
function getAsignaturas(){
      sltAsignatura = $('#sltAsignatura');

      var datos = $.ajax({
        url: '../asignatura/getAsignaturas',
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
          var sltAsignaturaAll = document.querySelectorAll("#sltAsignatura"); /*crea arreglo de todos los elementos con el mismo id*/
          var nSltAsig =  sltAsignaturaAll.length;

          for(var i=0; i<nSltAsig; i++){
            $.each(res, function(k,v){
              var option = document.createElement("option");  /*opcion dentro de select*/
              option.text = v.asigArea+'  -  '+v.asigNombre;
              option.value = v.asigId;
              sltAsignaturaAll[i].add(option);
            });
          }
      }else{
        messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
        'No existen asignaturas registradas');
        boxPoster.show().delay(2000).fadeOut();
      }
    }
    /***********************************************************************/
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

/*********************************************************************/
function getProfesores(){
  sltProfesor = $('#sltProfesor');

  var datos = $.ajax({
    url: '../profesor/getProfesores',
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
    var sltProfesorAll = document.querySelectorAll("#sltProfesor"); /*crea arreglo de todos los elementos con el mismo id*/
    var nSltProf =  sltProfesorAll.length;

    for(var i=0; i<nSltProf; i++){
        $.each(res, function(r,s){
          var option = document.createElement("option");  /*opcion dentro de select*/
          option.text = s.profNombre;
          option.value = s.profCurp;
          sltProfesorAll[i].add(option);
        });
    }
  }else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
    'No existen profesores registrados');
    boxPoster.show().delay(2000).fadeOut();
  }

}

/******************************************-----------------------------************--------------------*/
function profesorAsignatura(){
   var datos = $.ajax({
     url: '../ciclo/getIdCiclo',
     data: {
       ciclo: sltCiclo.val(),
       grupo: sltGrupo.val(),
       grado: sltGrado.val()
     },
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
         $.each(res, function(k,v){
           idCiclosT = v.cicId;    /*conseguir Id de ciclos*/
       });

       numeroAsignatura = txtNAsignatura.val();
       sltAsignatura.html('');
       sltProfesor.html('');
       formSelect.html('');

       var i;
       for (i=0; i<numeroAsignatura; i++){    /*Creacion de select para profesores y asignaturas*/
         var n = i+1;
         formSelect.append(
           '<div class="form-group">'+
           '<label for="sltProfesor" class="col-md-1 control-label">'+n+'</label>'+
           '<div class="col-md-5">'+
           '<select id="sltProfesor" class="form-control col-md-4 input-sm"></select>'+
           '</div>'+
           '<div class="col-md-5">'+
           '<select id="sltAsignatura" class="form-control col-md-4 input-sm"></select>'+
           '</div></div>'
         );

       }

       getProfesores();
       getAsignaturas();
       pnlProfesorAsignatura.removeClass('hidden');
   }else{
     messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
     'No existe grado y grupo para ese ciclo.');
     boxPoster.show().delay(2500).fadeOut();
   }
}

/*********************************************************************/
$(document).on('ready', function(){
  getCiclos();
  getGrupos();
});


$('#liAsignarProfesor').addClass('active');
btnSeleccionarCiclo.on('click', profesorAsignatura);
btnAgregar.on('click',asignarProfesorAsignatura);
btnCancelar.on('click',cancelar);
