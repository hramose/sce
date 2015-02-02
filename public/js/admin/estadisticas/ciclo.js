
var btnVer = $('#btnVer'),
	slctCiclo = $('#slctCiclo'),
  slctGrado = $('#slctGrado'),
  labelBime = $('#labelBime'),
  labelAsig= $('#labelAsig'),
  legendTable = $('#legendTable'),
  legendTableMateria = $('#legendTableMateria');


var pnlSelectEstadisticas = $('#pnlSelectEstadisticas'),
    pnlEstadisticasGrup = $('#pnlEstadisticasGrup'),
    pnlEstadisticasMateria = $('#pnlEstadisticasMateria'),
    tblEstadisticas = $('#tblEstadisticas'),
    tblEstadisticasMateria = $('#tblEstadisticasMateria'),
    tblEstadistGrupo = $('#tblEstadistGrupo'),
    tblEstadistAlu = $('#tblEstadistAlu'),
    tbodyEstadisticas = $('#tbodyEstadisticas'),
    tbodyEstadisticasMateria = $('#tbodyEstadisticasMateria'),
    tbodyEstadistGrupo = $('#tbodyEstadistGrupo'),
    tbodyEstadistAlu = $('#tbodyEstadistAlu'),
    TotalAlumnos = $('#TotalAlumnos');

   var grupos, indice, opcion, grupo; 

/* Funcion para mostrar estadísticas de un grupo en todo el ciclo */
function estadisticasCiclo(){
	if ( !validarSelectores() )
		return false;

    var datos = $.ajax({
    url: 'estadisticasCiclo',
    data: {
      ciclo: slctCiclo.val(), 
      grado: slctGrado.val()
    }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;

 var datos2 = $.ajax({
    url: 'getAprobReprobGrupo',
    data: {
      grado2: slctGrado.val()
    }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;

 var datos3 = $.ajax({
    url: 'getRangosCalificaciones',
    data: {
      grado3: slctGrado.val()
    }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;

 var datos4 = $.ajax({
    url: 'getTotalAlumnos',
    data: {
      gradoElegido: slctGrado.val()
    }, 
    type: 'post',
        dataType:'json',
        async:false
    }).error(function(e){
        alert('Ocurrio un error, intente de nuevo');
    }).responseText;
  
  
  
    var res;
    try{res = JSON.parse(datos);
    }catch (e){
              messagePoster.html('Error JSON ' + e);
              boxPoster.show().delay(2000).fadeOut();
             }

   var res2;
    try{res2 = JSON.parse(datos2);
    }catch (e){
              messagePoster.html('Error JSON ' + e);
              boxPoster.show().delay(2000).fadeOut();
              }

    var res3;
    try{res3 = JSON.parse(datos3);
    }catch (e){
              messagePoster.html('Error JSON ' + e);
              boxPoster.show().delay(2000).fadeOut();
              }

   var res4;
    try{res4 = JSON.parse(datos4);
    }catch (e){
              messagePoster.html('Error JSON ' + e);
              boxPoster.show().delay(2000).fadeOut();
              }    

  grupos = document.getElementById("slctGrado");  
  indice = grupos.selectedIndex;
  opcion = grupos.options[indice];
  grupo = opcion.text; 
  legendTable.html("CICLO: " + slctCiclo.val() + "  GRUPO: "+ grupo);
 
 var promb1,promb2,promb3,promb4,promb5;
    tbodyEstadisticas.html('');
    if ( res.status === 'OK' ){

        $.each(res.data , function(k,o){
          if(o.proB1 == null){promb1=0;} if(o.proB1 != null){promb1=o.proB1;}
          if(o.proB2 == null){promb2=0;} if(o.proB2 != null){promb2=o.proB2;}
          if(o.proB3 == null){promb3=0;} if(o.proB3 != null){promb3=o.proB3;}
          if(o.proB4 == null){promb4=0;} if(o.proB4 != null){promb4=o.proB4;}
          if(o.proB5 == null){promb5=0;} if(o.proB5 != null){promb5=o.proB5;}

           tbodyEstadisticas.append(
          '<tr>'+
            '<td>'+o.asigClave+'</td>'+
            '<td>'+o.asigArea+'</td>'+
            '<td class="center">'+
            '<span class="glyphicon glyphicon-folder-open" id="'+o.asigId+'" '+
            'style="cursor:pointer" title="Consultar"></span>'+
            '</td>'+
            '<td>'+o.asigNombre+'</td>'+
            '<td>'+promb1+'</td>'+
            '<td>'+promb2+'</td>'+
            '<td>'+promb3+'</td>'+
            '<td>'+promb4+'</td>'+
            '<td>'+promb5+'</td>'+
            '<td>'+o.proG+'</td>'+
           '</tr>'
          );               
      });   

       TotalAlumnos.html('');
        $.each(res4.data , function(k,o4){
         TotalAlumnos.append(
            '<h4>'+'Total Alumnos en el grupo: '+o4.totAlumnos+'</h4>'
          );               
      }); 

    tbodyEstadistGrupo.html('');
        $.each(res2.data , function(k,o2){
          tbodyEstadistGrupo.append( 
          '<tr>'+
            '<td>'+o2.asigClave+'</td>'+
            '<td>'+o2.asigArea+'</td>'+
            '<td>'+o2.asigNombre+'</td>'+
            '<td>'+o2.apr1+'</td>'+
            '<td>'+o2.repr1+'</td>'+
            '<td>'+o2.apr2+'</td>'+
            '<td>'+o2.repr2+'</td>'+
            '<td>'+o2.apr3+'</td>'+
            '<td>'+o2.repr3+'</td>'+
            '<td>'+o2.apr4+'</td>'+
            '<td>'+o2.repr4+'</td>'+
            '<td>'+o2.apr5+'</td>'+
            '<td>'+o2.repr5+'</td>'+
           '</tr>'
          );
         });  
     tbodyEstadistAlu.html('');
        $.each(res3.data , function(k,o3){
          tbodyEstadistAlu.append( 
          '<tr>'+
            '<td>'+o3.asigNombre+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal101+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal91+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal81+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal71+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal61+'</td>'+
            '<td>'+o3.cal102+'</td>'+
            '<td>'+o3.cal92+'</td>'+
            '<td>'+o3.cal82+'</td>'+
            '<td>'+o3.cal72+'</td>'+
            '<td>'+o3.cal62+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal103+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal93+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal83+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal73+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal63+'</td>'+
            '<td>'+o3.cal104+'</td>'+
            '<td>'+o3.cal94+'</td>'+
            '<td>'+o3.cal84+'</td>'+
            '<td>'+o3.cal74+'</td>'+
            '<td>'+o3.cal64+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal105+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal95+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal85+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal75+'</td>'+
            '<td bgcolor="#ffffff">'+o3.cal65+'</td>'+
            '</tr>' 
             );
         });   
        pnlEstadisticasGrup.removeClass('hidden');  
        pnlEstadisticasMateria.addClass('hidden');      
    }
    else if(res.status === 'ERROR'){
        pnlEstadisticasGrup.addClass('hidden');
        pnlEstadisticasMateria.addClass('hidden'); 
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
                      alert('Ocurrio un error (obtener ciclos), intente de nuevo');
                     }).responseText;

  var res;
      try{ res = JSON.parse(datos);
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
        alert('Ocurrio un error (obtener grados), intente de nuevo');
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

function estadisticasBimestreAsignatura(){
    var id = $(this).attr('id');
    if (id==="")
      return false;
    asignaturaSeleccionada = id;

    var datos = $.ajax({
      url: 'estadisticasBimestreAsignatura',
      data: {
        id: asignaturaSeleccionada,
        grado: slctGrado.val()
      },
      type: 'post',
      dataType:'json',
      async:false
    }).error(function(e){
      alert('Ocurrio un error, intente de nuevo');
    }).responseText;

    var res;
    try{res = JSON.parse(datos);
        }catch(e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
       }

    tbodyEstadisticasMateria.html('');
    if ( res.status === 'OK' ){
      var mat = res.data.materia,
      dat = res.data.busqueda;
  
       legendTableMateria.html("CICLO: "+ slctCiclo.val()+ " GRUPO: "+ grupo);
       labelAsig.html("<h4>"+"Clave: "+mat.asigClave+" "+mat.asigArea+" "+mat.asigNombre+"</h4>"); 
     
        $.each(dat , function(k,o){
          if(o.proB1 == null){promb1=0;} if(o.proB1 != null){promb1=o.proB1;}
          if(o.proB2 == null){promb2=0;} if(o.proB2 != null){promb2=o.proB2;}
          if(o.proB3 == null){promb3=0;} if(o.proB3 != null){promb3=o.proB3;}
          if(o.proB4 == null){promb4=0;} if(o.proB4 != null){promb4=o.proB4;}
          if(o.proB5 == null){promb5=0;} if(o.proB5 != null){promb5=o.proB5;}

           tbodyEstadisticasMateria.append(
          '<tr>'+
           '<td>'+o.aluCurp+'</td>'+
           '<td>'+o.aluApep+' '
                 +o.aluApem+' '
                 +o.aluNombre+'</td>'+
           '<td>'+o.profNombre+'</td>'+
            '<td>'+promb1+'</td>'+
            '<td>'+promb2+'</td>'+
            '<td>'+promb3+'</td>'+
            '<td>'+promb4+'</td>'+
            '<td>'+promb5+'</td>'+
           '</tr>'
          );               
      });  
       pnlEstadisticasMateria.removeClass('hidden'); 
       pnlEstadisticasGrup.addClass('hidden');
       pnlSelectEstadisticas.addClass('hidden');       
    }
    else if(res.status === 'ERROR'){
        pnlEstadisticasGrup.addClass('hidden');
        pnlEstadisticasMateria.addClass('hidden'); 
        icon = '<span class="glyphicon glyphicon-remove"></span> ';
        messagePoster.html(icon+res.message);
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

	return true;
}


/* Eventos */
$(document).on('ready', function(){
	getCiclos();
  getGrados();
});
tblEstadisticas.delegate('.glyphicon-folder-open', 'click', estadisticasBimestreAsignatura);
slctCiclo.on('change',getGrados);
btnVer.on('click', estadisticasCiclo);
$('#liEstadisticasCiclo').addClass('active');