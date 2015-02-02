/* Nodos */

var btnVer = $('#btnVer'),
	slctCiclo = $('#slctCiclo'),
  slctGrado = $('#slctGrado'),
  slctBimestre = $('#slctBimestre'),
  TotalAlumnos = $('#TotalAlumnos'),
  legendTable = $('#legendTable'),
  labelBime = $('#labelBime');


var pnlEstadisticasGrup = $('#pnlEstadisticasGrup'),
    tblEstadisticas = $('#tblEstadisticas'),
    tblEstadistGrupo = $('#tblEstadistGrupo'),
    tblEstadistAlu = $('#tblEstadistAlu'),
    tbodyEstadisticas = $('#tbodyEstadisticas'),
    tbodyEstadistGrupo = $('#tbodyEstadistGrupo'),
    tbodyEstadistAlu = $('#tbodyEstadistAlu');

/* Funcion para mostrar estadísticas de un grupo en un bimestre*/
function estadisticasBimestre(){
	if ( !validarSelectores() )
		return false;

    var datos = $.ajax({
    url: 'estadisticasBimestre',
    data: { 
      grado: slctGrado.val(),
      bimestre: slctBimestre.val() }, 
    type: 'post', dataType:'json',
    async:false }).error(function(e)
    {alert('Ocurrio un error, intente de nuevo');
    }).responseText;  
    var res;
    try{
        res = JSON.parse(datos);
    }catch (e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
    }


    var datosTAlumnos = $.ajax({
    url: 'getTotalAlumnos',
    data: {
      gradoElegido: slctGrado.val(), }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;
   var resTAlumnos;
    try{
        resTAlumnos = JSON.parse(datosTAlumnos);
    }catch (e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
    } 


var datosAR = $.ajax({
    url: 'getAprobReprobBimestre',
    data: {
      gradoAR: slctGrado.val(),
      bimestreAR: slctBimestre.val()
    }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;
   var resAR;
    try{
        resAR = JSON.parse(datosAR);
    }catch (e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
    }


 var datosRangos = $.ajax({
    url: 'getRangosCalifBimestre',
    data: {
      gradoRangos: slctGrado.val(),
      bimestreRangos: slctBimestre.val()
    }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;
       var resRangos;
    try{
        resRangos = JSON.parse(datosRangos);
    }catch (e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
    } 

     var grupos = document.getElementById("slctGrado");    
     var indice = grupos.selectedIndex;
     var opcion = grupos.options[indice];
     var grupo = opcion.text; 

     var bimestres = document.getElementById("slctBimestre");
     var indiceBim = bimestres.selectedIndex;
     var opBim = bimestres.options[indiceBim];
     var bimestre = opBim.text; 


 legendTable.html("CICLO: "+ slctCiclo.val()+ " GRUPO: "+ grupo);
 labelBime.html("<h4>"+"CALIFICACIONES BIMESTRE: "+bimestre+"</h4>");
   
    tbodyEstadisticas.html('');
    if ( res.status === 'OK' ){
        $.each(res.data , function(k,o){
         tbodyEstadisticas.append(
          '<tr>'+
           '<td>'+o.aluCurp+'</td>'+
           '<td>'+o.aluApep+' '
                 +o.aluApem+' '
                 +o.aluNombre+'</td>'+
           '<td>'+o.asigArea+' '
                 +o.asigNombre+'</td>'+      
           '<td align="center">'+o.proB1+'</td>'+
           '</tr>'
          );               
      });   
       pnlEstadisticasGrup.removeClass('hidden'); 
        TotalAlumnos.html('');
        $.each(resTAlumnos.data , function(k,o4){
         TotalAlumnos.append(
            '<h4>'+'Total Alumnos en el grupo: '+o4.totAlumnos+'</h4>'
          );               
      });  

      tbodyEstadistGrupo.html('');
        $.each(resAR.data , function(k,o2){
          tbodyEstadistGrupo.append( 
          '<tr>'+
            '<td>'+o2.asigClave+'</td>'+
            '<td>'+o2.asigArea+'</td>'+
            '<td>'+o2.asigNombre+'</td>'+
            '<td>'+o2.apr1+'</td>'+
            '<td>'+o2.repr1+'</td>'+
           '</tr>'
          );
         });  
     tbodyEstadistAlu.html('');
        $.each(resRangos.data , function(k,o3){
          tbodyEstadistAlu.append( 
          '<tr>'+
            '<td>'+o3.asigArea+'</td>'+
            '<td>'+o3.asigNombre+'</td>'+
            '<td>'+o3.cal10+'</td>'+
            '<td>'+o3.cal9+'</td>'+
            '<td>'+o3.cal8+'</td>'+
            '<td>'+o3.cal7+'</td>'+
            '<td>'+o3.cal6+'</td>'+
           '</tr>' 
             );
         }); 
    }
    else if(res.status === 'ERROR'){
        pnlEstadisticasGrup.addClass('hidden');
        icon = '<span class="glyphicon glyphicon-remove"></span> ';
        messagePoster.html(icon+res.message);
        boxPoster.show().delay(2000).fadeOut();
        }
}



function getCiclos(){
  var datos = $.ajax({
                      url: 'getCiclos',
                      type: 'get',
                      async:false
                     }).error(function(e){ 
                      alert('Ocurrio un error (obtener Ciclos), intente de nuevo');
                     }).responseText;

  var res;
      try{
           res = JSON.parse(datos);
          }catch (e){
                   messagePoster.html('Error JSON ' + e);
                   boxPoster.show().delay(2000).fadeOut();
                    }


    if ( res.length > 0 ){
         slctCiclo.html('');
        
         $.each(res, function(k,v){
             slctCiclo.append(
            '<option value="'+v.cicCiclo+'">'+v.cicCiclo+'</option>'
            );
          });
       }
    else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen ciclos registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}

function getGrados(){

  var datos = $.ajax({
    url: 'getGrados', data: {
              ciclo: slctCiclo.val()
               }, 
        type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error (obtener Grupos), intente de nuevo');
    }).responseText;

  var res;
      try{
           res = JSON.parse(datos);
          }catch (e){
                   messagePoster.html('Error JSON ' + e);
                   boxPoster.show().delay(2000).fadeOut();
                    }

    if ( res.length > 0 ){
         slctGrado.html('');
        
         $.each(res, function(k,v){
             slctGrado.append(
            '<option value="'+v.cicId+'">'+v.cicGrado+' - '+v.grupNombre+'</option>'
            );
          });
       }
    else{
    messagePoster.html('<span class="glyphicon glyphicon-remove"></span> ' +
      'No existen grupos registrados');
    boxPoster.show().delay(2000).fadeOut();
  }
}


function validarSelectores(){
if ( slctCiclo.val() === "" || slctCiclo.val() == null ){
		alert('Seleccione un ciclo para obtener estadísticas');
		slctCiclo.focus();
		return false;
	}
if ( slctGrado.val() === "" || slctGrado.val() == null ){
    alert('Seleccione un grado y grupo para obtener estadísticas');
    slctGrado.focus();
    return false;
  }
if ( slctBimestre.val() === "" || slctBimestre.val() == null ){
    alert('Seleccione bimestre para obtener estadísticas');
    slctBimestre.focus();
    return false;
  }  

	return true;
}


/* Eventos */
$(document).on('ready', function(){
	getCiclos();
  getGrados();;
});
slctCiclo.on('change',getGrados);
btnVer.on('click', estadisticasBimestre);
$('#liEstadisticasBimestre').addClass('active');