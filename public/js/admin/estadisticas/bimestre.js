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

var th1 = $('#th1'),  th2 = $('#th2'),
    th3 = $('#th3'),  th4 = $('#th4'),
    th5 = $('#th5'),  th6 = $('#th6'),
    th7 = $('#th7'),  th8 = $('#th8'),
    th9 = $('#th9'),  th10 = $('#th10'),
    th11 = $('#th11'),th12 = $('#th12'),
    thPromedio = $('#thPromedio');

//Funcion que obtiene una cadena con la query de materias del bimestre formateadas con group_concat
function cadenaMateriasBimestre(){
	if ( !validarSelectores() )
		return false;

    var datosCadena = $.ajax({
    url: 'cadenaMateriasBimestre',
    data: { 
      grado: slctGrado.val(),
      bimestre: slctBimestre.val() }, 
    type: 'post', dataType:'json',
    async:false }).error(function(e)
    {alert('Ocurrio un error:(obtener materias), intente de nuevo');
    }).responseText;  
    var resCadena;
    try{
        resCadena = JSON.parse(datosCadena);
    }catch (e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
    }

//Obtiene los nombres de materias para colocarse en el encabezado de la tabla (tblEstadisticas) 
    var datosMaterias = $.ajax({
    url: 'materiasBimestre',
    data: { 
      gradoM: slctGrado.val(),
      bimestreM: slctBimestre.val() }, 
    type: 'post', dataType:'json',
    async:false }).error(function(e)
    {alert('Ocurrio un error:(no se obtuvieron materias), intente de nuevo');
    }).responseText;  
    var resMaterias;
    try{
        resMaterias = JSON.parse(datosMaterias);
    }catch (e){
        messagePoster.html('Error JSON ' + e);
        boxPoster.show().delay(2000).fadeOut();
    }  

//obtiene el total de alumnos en el grado, grupo, bimestre
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

//obtiene un conteo de alumnos aprobados y reprobados en cada materia del grado, grupo, bimestre
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

//obtiene un conteo de alumnos en los rangos de calificaciones (de 9 a 10, de 8 a 9, etc) en cada materia del bimestre 
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
     //cada posicion del arreglo eliminara su coincidencia en una cadena (para solo obtener las calificaciones)
     var arreglo = [/{/g,/a/g,/b/g,/c/g,/d/g,/e/g,/f/g,/g/g,/h/g,/i/g,/j/g,/k/g,/l/g,/m/g,/n/g,/ñ/g,/o/g,/p/g,/q/g,/r/g,/s/g,/t/g,/u/g,/v/g,/w/g,/x/g,/y/g,/z/g,/A/g,/B/g,/C/g,/D/g,/E/g,/F/g,/G/g,/H/g,/I/g,/J/g,/K/g,/L/g,/M/g,/N/g,/Ñ/g,/O/g,/P/g,/Q/g,/R/g,/S/g,/T/g,/U/g,/V/g,/W/g,/X/g,/Y/g,/Z/g,/}/g];
     var resd, d;
     var nMaterias;

 legendTable.html("CICLO: "+ slctCiclo.val()+ " GRUPO: "+ grupo);
 labelBime.html("<h4>"+"CALIFICACIONES BIMESTRE: "+bimestre+"</h4>");
   
   
    if (resCadena.status === 'OK' ){
         pnlEstadisticasGrup.removeClass('hidden'); 
        $.each(resCadena.data , function(k,o){
            //document.write(o.cadena);
            d = $.ajax({
            url: 'calificacionesBimestre',
            data: { 
              gradod: slctGrado.val(),
              bimestred: slctBimestre.val(),
              cadena: o.cadena }, 
            type: 'post', dataType:'json',
            async:false }).error(function(e)
            {alert('Ocurrio un error de configuración');
            }).responseText;  

            resd;
            try{
                resd = JSON.parse(d);
            }catch (e){
                messagePoster.html('Error JSON resd' + e);
                boxPoster.show().delay(2000).fadeOut();
            }
         });   
         }
        else if(resCadena.status === 'ERROR'){
        pnlEstadisticasGrup.addClass('hidden');
        icon = '<span class="glyphicon glyphicon-remove"></span> ';
        messagePoster.html(icon+resCadena.message);
        boxPoster.show().delay(2000).fadeOut();
        }  
          
       
 //Si aparece error consola js:Uncaught TypeError: Cannot read property 'status' of undefined
 //Agregar la siguiente linea al archivo en Windows: C:\xampp\mysql\bin\my.ini linea:group_concat_max_len = 4096 
 //Causa:el tamaño predeterminado de esas variable es 1024 y cuando las materias son muchas y su nombre largo excede ese tamaño y la cadena es truncada y no es posible leer su estado.
   if (resd.status === 'OK' ){
      pnlEstadisticasGrup.removeClass('hidden'); 
      tbodyEstadisticas.html('');   
      //se crea una cadena separada con el sig. formato para mostrar las calificaciones
      //solo interesan los numeros se eliminan caracteres q coincidan con arreglo
      //ej. resultado: 89022306,,,,8,7,8
        $.each(resd.data , function(k,o2){
         //alert(o2.Español);
         var r2; var i=0; var j=0;
         var r = JSON.stringify(resd.data[k]);

             r2 = r.replace('{', '');
           for( i; i<arreglo.length; i++)
              { r2 = r2.replace(arreglo[i], '');
              }
        var z;
           for( j; j<resd.data.length ; j++)
              {
                z=  r2.split(',');
              }

         var materiasBimestre = new Array(resMaterias.data.length); 
        $.each(resMaterias.data , function(k,oM){   
          materiasBimestre[k] = oM.asigNombre;
         });      

        var tama = (resd.data.length+4);
        var x = new Array(tama);
        nMaterias = resMaterias.data.length;

           for(var o=4; o < (nMaterias+4); o++){
              //Se evita tomar en cuenta posibles numeros en la cadena del nombre de la materia
              //ej: "1":8,"":7,"":8,"4":7 viene de Español1,Mat,Cien,Materia4
              for(var w=0; w < (z[o].length); w++){  
                    var caracter = z[o].charAt(w);
                    if(caracter == ":"){
                      x[o]= z[o].charAt(w+1);
                      x[o]+= z[o].charAt(w+2);
                      x[o]+= z[o].charAt(w+3);
                      x[o]+= z[o].charAt(w+4);  
                    }
                  } 
                }
           //document.write(x[4]); 
   //switch para mostrar solo el caso especifico de n materias de un grupo en el bimestre
    switch (nMaterias)
          {
            case 1: th1.html("<h5>"+"CURP"+"</h5>"); th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>"); th4.html("<h5>"+"Promedio"+"</h5>");
                    th5.html("");th6.html("");th7.html("");th8.html("");th9.html("");th10.html("");th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){//coloca un 0 para calcular promedio y evitar NaN
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+'<td>'+(parseFloat(x[4])).toFixed(1)+'</td>'+'</tr>'    
                    //'<td>'+ JSON.stringify(resd.data[k]) +'</td>'+'<td>'+ r2 +'</td>'+ 
                    );
                    break;

            case 2: th1.html("<h5>"+"CURP"+"</h5>"); th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>"); th4.html("<h5>"+materiasBimestre[1]+"</h5>"); th5.html("<h5>"+"Promedio"+"</h5>");
                    th6.html("");th7.html("");th8.html("");th9.html("");th10.html("");th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+ '<td>'+ x[5] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5]))/nMaterias).toFixed(1)+'</td>'+'</tr>' );
                    break;

            case 3: th1.html("<h5>"+"CURP"+"</h5>"); th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>");  th4.html("<h5>"+materiasBimestre[1]+"</h5>");  th5.html("<h5>"+materiasBimestre[2]+"</h5>"); th6.html("<h5>"+"Promedio"+"</h5>");
                    th7.html("");th8.html("");th9.html("");th10.html("");th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+ '<td>'+ x[5] +'</td>'+'<td>'+ x[6] +'</td>'+ '<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6]))/nMaterias).toFixed(1)+'</td>'+'</tr>');  
                    break;

            case 4: th1.html("<h5>"+"CURP"+"</h5>");th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>");th4.html("<h5>"+materiasBimestre[1]+"</h5>");th5.html("<h5>"+materiasBimestre[2]+"</h5>");th6.html("<h5>"+materiasBimestre[3]+"</h5>");th7.html("<h5>"+"Promedio"+"</h5>");
                    th8.html("");th9.html("");th10.html("");th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4]+'</td>'+'<td>'+ x[5] +'</td>'+'<td>'+ x[6] +'</td>'+'<td>'+ x[7] +'</td>'+ '<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7]))/nMaterias).toFixed(1)+'</td>'+ '</tr>');  
                    break;

            case 5: th1.html("<h5>"+"CURP"+"</h5>"); th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>"); th4.html("<h5>"+materiasBimestre[1]+"</h5>"); th5.html("<h5>"+materiasBimestre[2]+"</h5>");th6.html("<h5>"+materiasBimestre[3]+"</h5>");th7.html("<h5>"+materiasBimestre[4]+"</h5>");th8.html("<h5>"+"Promedio"+"</h5>");
                    th9.html("");th10.html("");th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+ '<td>'+ x[5] +'</td>'+'<td>'+ x[6] +'</td>'+'<td>'+ x[7] +'</td>'+ '<td>'+ x[8] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7])+parseFloat(x[8]))/nMaterias).toFixed(1)+'</tr>' );  
                    break;

            case 6: th1.html("<h5>"+"CURP"+"</h5>");th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>"); th4.html("<h5>"+materiasBimestre[1]+"</h5>"); th5.html("<h5>"+materiasBimestre[2]+"</h5>");  th6.html("<h5>"+materiasBimestre[3]+"</h5>"); th7.html("<h5>"+materiasBimestre[4]+"</h5>"); th8.html("<h5>"+materiasBimestre[5]+"</h5>"); th9.html("<h5>"+"Promedio"+"</h5>");
                    th10.html("");th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+'<td>'+ x[5] +'</td>'+'<td>'+ x[6] +'</td>'+'<td>'+ x[7] +'</td>'+ '<td>'+ x[8] +'</td>'+'<td>'+ x[9] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7])+parseFloat(x[8])+parseFloat(x[9]))/nMaterias).toFixed(1)+ '</tr>' );  
                    break;

            case 7: th1.html("<h5>"+"CURP"+"</h5>"); th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>");th4.html("<h5>"+materiasBimestre[1]+"</h5>"); th5.html("<h5>"+materiasBimestre[2]+"</h5>"); th6.html("<h5>"+materiasBimestre[3]+"</h5>"); th7.html("<h5>"+materiasBimestre[4]+"</h5>"); th8.html("<h5>"+materiasBimestre[5]+"</h5>"); th9.html("<h5>"+materiasBimestre[6]+"</h5>");th10.html("<h5>"+"Promedio"+"</h5>");
                    th11.html("");th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+ '<td>'+ x[5] +'</td>'+ '<td>'+ x[6] +'</td>'+ '<td>'+ x[7] +'</td>'+'<td>'+ x[8] +'</td>'+'<td>'+ x[9] +'</td>'+ '<td>'+ x[10] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7])+parseFloat(x[8])+parseFloat(x[9])+parseFloat(x[10]))/nMaterias).toFixed(1)+ '</tr>' );  
                    break;

            case 8: th1.html("<h5>"+"CURP"+"</h5>");th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>");th4.html("<h5>"+materiasBimestre[1]+"</h5>");th5.html("<h5>"+materiasBimestre[2]+"</h5>"); th6.html("<h5>"+materiasBimestre[3]+"</h5>");th7.html("<h5>"+materiasBimestre[4]+"</h5>");th8.html("<h5>"+materiasBimestre[5]+"</h5>");th9.html("<h5>"+materiasBimestre[6]+"</h5>"); th10.html("<h5>"+materiasBimestre[7]+"</h5>"); th11.html("<h5>"+"Promedio"+"</h5>");
                    th12.html("");thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+ '<td>'+ x[5] +'</td>'+ '<td>'+ x[6] +'</td>'+ '<td>'+ x[7] +'</td>'+ '<td>'+ x[8] +'</td>'+'<td>'+ x[9] +'</td>'+'<td>'+ x[10] +'</td>'+'<td>'+ x[11] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7])+parseFloat(x[8])+parseFloat(x[9])+parseFloat(x[10])+parseFloat(x[11]))/nMaterias).toFixed(1)+  '</tr>' );  
                    break;

            case 9: th1.html("<h5>"+"CURP"+"</h5>");th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>");th4.html("<h5>"+materiasBimestre[1]+"</h5>");th5.html("<h5>"+materiasBimestre[2]+"</h5>");th6.html("<h5>"+materiasBimestre[3]+"</h5>"); th7.html("<h5>"+materiasBimestre[4]+"</h5>");th8.html("<h5>"+materiasBimestre[5]+"</h5>"); th9.html("<h5>"+materiasBimestre[6]+"</h5>");th10.html("<h5>"+materiasBimestre[7]+"</h5>");th11.html("<h5>"+materiasBimestre[8]+"</h5>");th12.html("<h5>"+"Promedio"+"</h5>");
                    thPromedio.html("");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+'<td>'+ x[5] +'</td>'+'<td>'+ x[6] +'</td>'+ '<td>'+ x[7] +'</td>'+ '<td>'+ x[8] +'</td>'+ '<td>'+ x[9] +'</td>'+ '<td>'+ x[10] +'</td>'+ '<td>'+ x[11] +'</td>'+'<td>'+ x[12] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7])+parseFloat(x[8])+parseFloat(x[9])+parseFloat(x[10])+parseFloat(x[11])+parseFloat(x[12]))/nMaterias).toFixed(1)+'</tr>');  
                    break;

            case 10: th1.html("<h5>"+"CURP"+"</h5>"); th2.html("<h5>"+"Alumno"+"</h5>");
                    th3.html("<h5>"+materiasBimestre[0]+"</h5>");th4.html("<h5>"+materiasBimestre[1]+"</h5>"); th5.html("<h5>"+materiasBimestre[2]+"</h5>");th6.html("<h5>"+materiasBimestre[3]+"</h5>");th7.html("<h5>"+materiasBimestre[4]+"</h5>");th8.html("<h5>"+materiasBimestre[5]+"</h5>");th9.html("<h5>"+materiasBimestre[6]+"</h5>");th10.html("<h5>"+materiasBimestre[7]+"</h5>"); th11.html("<h5>"+materiasBimestre[8]+"</h5>"); th12.html("<h5>"+materiasBimestre[9]+"</h5>");
                    thPromedio.html("<h5>"+"Promedio"+"</h5>");
                    for(var t=4; t<(nMaterias+4); t++){
                    if(x[t]==""){x[t]=0;} }
                    tbodyEstadisticas.append('<tr>'+'<td>'+ o2.aluCurp+'</td>'+'<td>'+o2.aluApep+' ' +o2.aluApem+' ' +o2.aluNombre+'</td>'+
                    '<td>'+ x[4] +'</td>'+'<td>'+ x[5] +'</td>'+'<td>'+ x[6] +'</td>'+ '<td>'+ x[7] +'</td>'+ '<td>'+ x[8] +'</td>'+ '<td>'+ x[9] +'</td>'+ '<td>'+ x[10] +'</td>'+ '<td>'+ x[11] +'</td>'+'<td>'+ x[12] +'</td>'+'<td>'+ x[13] +'</td>'+'<td>'+((parseFloat(x[4])+parseFloat(x[5])+parseFloat(x[6])+parseFloat(x[7])+parseFloat(x[8])+parseFloat(x[9])+parseFloat(x[10])+parseFloat(x[11])+parseFloat(x[12])+parseFloat(x[13]))/nMaterias).toFixed(1)+'</tr>');  
                    break;
          }
       });

 
            TotalAlumnos.html('');
              $.each(resTAlumnos.data , function(k,o4){
                   TotalAlumnos.append(
                  '<h4>'+'Total Alumnos en el grupo: '+o4.totAlumnos+'</h4>'
                );               
            });  


    //Se muestran total de aprobados y reprobados en c/Asignatura
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
 else if(resd.status === 'ERROR'){  //pnlEstadisticasGrup.addClass('hidden');
        tbodyEstadisticas.html('<tr><td colspan="10" class="center"><h4>'+ resd.message +'</h4></td></tr>');
        th3.html('');th4.html('');th5.html('');th6.html('');th7.html('');
        th8.html('');th9.html('');th10.html('');th11.html('');thPromedio.html('');
        tbodyEstadistAlu.html('');
        tbodyEstadistGrupo.html('');
        TotalAlumnos.html('');
        icon = '<span class="glyphicon glyphicon-remove"></span> ';
        messagePoster.html(icon+resd.message);
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
btnVer.on('click', cadenaMateriasBimestre);
$('#liEstadisticasBimestre').addClass('active');