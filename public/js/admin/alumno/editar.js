/* Nodos */
var btnBuscar = $('#btnBuscar'),
  btnCancelar = $('#btnCancelar'),
  btnGuardar = $('#btnGuardar'),
	txtBuscar = $('#txtBuscar');

	/* Tabla alumnos encontrados */
var tblAlumnos = $('#tblAlumnos'),
	tbodyAlumnos = $('#tbodyAlumnos');

var pnlEditAlumno = $('#pnlEditAlumno'),
  oldCurp = $('#oldCurp'),
  txtCurp = $('#txtCurp'),
  txtApep = $('#txtApep'),
  txtApem = $('#txtApem'),
  txtNombre = $('#txtNombre'),
  txtSexo = $('#txtSexo'),
  txtTutor = $('#txtTutor'),
  txtTelefono = $('#txtTelefono'),
  txtDireccion = $('#txtDireccion'),
  txtEdad = $('#txtEdad'),
  txtEscuela = $('#txtEscuela'),
  txtActivo = $('#txtActivo'),
  txtObservacion = $('#txtObservacion');

/* Funciones */
function buscarAlumno(){
  pnlEditAlumno.addClass('hidden');

	if ( txtBuscar.val() === "" )
		return;

	var datos = $.ajax({
		url: 'buscarAlumno',
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

    tbodyAlumnos.html('');
    if ( res.status === 'OK' ){
    	var i = 1;
    	$.each(res.data, function(k,o){
    		if ( o.aluEstado == 1 )
    			status = '<span class="glyphicon glyphicon-ok" title="Activo"></span>';
    		else
    			status = '<span class="glyphicon glyphicon-remove" title="Inactivo"></span>';

    		tbodyAlumnos.append(
    			'<tr>'+
    				'<td class="center">'+i+'</td>'+
    				'<td>'+o.aluCurp+'</td>'+
    				'<td>'+o.aluApep+' '+o.aluApem+' '+o.aluNombre+'</td>'+
    				'<td>'+o.aluTutor+'</td>'+
    				'<td class="center">'+o.aluTelefono+'</td>'+
    				'<td class="center">'+status+'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-edit" id="'+o.aluCurp+'" '+
    					'style="cursor:pointer" title="Editar"></span>'+
					'</td>'+
    				'<td class="center">'+
    					'<span class="glyphicon glyphicon-trash" id="'+o.aluCurp+'" '+
    					'style="cursor:pointer" title="Eliminar"></span>'+
					'</td>'+
    			'</tr>'
			);
			i++;
    	});
    }else
    	tbodyAlumnos.html('<tr><td colspan="8" class="center"><h3>'+ res.message +'</h3></td></tr>');

	tblAlumnos.removeClass('hidden');
}

function editarAlumno(){
  if ( !validarAlumno() )
    return false;

  var datos = $.ajax({
    url:'editarAlumno',
    data: {
      oldCurp: oldCurp.val(),
      curp: txtCurp.val(),
      apep: txtApep.val(),
      apem: txtApem.val(),
      nombre: txtNombre.val(),
      sexo: txtSexo.val(),
      tutor: txtTutor.val(),
      telefono: txtTelefono.val(),
      direccion: txtDireccion.val(),
      edad: txtEdad.val(),
      escuela: txtEscuela.val(),
      activo: txtActivo.val(),
      observacion: txtObservacion.val()
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
    pnlEditAlumno.addClass('hidden');
    txtBuscar.val(oldCurp.val());
    buscarAlumno();
  }else
    icon = '<span class="glyphicon glyphicon-remove"></span> ';
  
  messagePoster.html(icon + res.message);
  boxPoster.show().delay(3000).fadeOut();
}

function eliminarAlumno(){
	var id = $(this).attr('id');
	if ( id === "" )
		return false;

	var del = confirm('¿Está seguro que desea eliminar al alumno');
	if ( del == false )
		return false;

	var datos = $.ajax({
		url: 'eliminarAlumno',
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
    	buscarAlumno();
    }else
    	icon = '<span class="glyphicon glyphicon-remove"></span> ';
    
  messagePoster.html(icon + res.message);
	boxPoster.show().delay(3000).fadeOut();
}

function getEditarAlumno(){
  var id = $(this).attr('id');
  if ( id === "" )
    return false;

  var datos = $.ajax({
    url: 'getEditarAlumno',
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
      txtBuscar.val('');
      tbodyAlumnos.html('');
      tblAlumnos.addClass('hidden');
      pnlEditAlumno.removeClass('hidden');

      var alu = res.data.alumno,
        escuelas = res.data.escuelas;

      txtEscuela.html('');
      $.each(escuelas, function(k,v){
        txtEscuela.append(
          '<option value="'+v.escId+'">'+v.escNombre+' - '+v.turNombre+'</option>'
        );
      });

      /* Llenar datos del alumno en el form */
      oldCurp.val(alu.aluCurp);
      txtCurp.val(alu.aluCurp);
      txtApem.val(alu.aluApem);
      txtApep.val(alu.aluApep);
      txtNombre.val(alu.aluNombre);
      txtTutor.val(alu.aluTutor),
      txtTelefono.val(alu.aluTelefono);
      txtDireccion.val(alu.aluDireccion);
      txtEdad.val(alu.aluEdad);
      txtObservacion.val(alu.aluObservaciones);

      txtSexo.find('option').each(function(){
        if ( alu.aluSexo == $(this).val() )
          txtSexo.val(alu.aluSexo);
      });

      txtEscuela.find('option').each(function(){
        if ( alu.aluEscuela == $(this).val() )
          txtEscuela.val(alu.aluEscuela);
      });

      txtActivo.find('option').each(function(){
        if ( alu.aluEstado == $(this).val() )
          txtActivo.val(alu.aluEstado);
      });

    }else{
      icon = '<span class="glyphicon glyphicon-remove"></span> ';
      messagePoster.html(icon + res.message);
      boxPoster.show().delay(3000).fadeOut();
    }
}

function validarAlumno(){
  if ( txtCurp.val() === "" || txtCurp.val().length < 18 ){
    alert('Indique una CURP válida');
    txtCurp.focus();
    return false;
  }
  if ( txtApep.val() === "" ){
    alert('Indique el apellido paterno alumno');
    txtApep.focus();
    return false;
  }
  if ( txtApem.val() === "" ){
    alert('Indique el apellido materno alumno');
    txtApem.focus();
    return false;
  }
  if ( txtNombre.val() === "" ){
    alert('Indique el nombre del alumno');
    txtNombre.focus();
    return false;
  }
  if ( txtTutor.val() === "" ){
    alert('Indique el nombre del padre o tutor');
    txtTutor.focus();
    return false;
  }
  if ( txtTelefono.val() === "" ){
    alert('Indique el teléfono del padre o tutor');
    txtTelefono.focus();
    return false;
  }
  if ( txtDireccion.val() === "" ){
    alert('Indique la dirección del alumno');
    txtDireccion.focus();
    return false;
  }
  var patt = new RegExp('^[0-9]{1,2}$');
  if ( txtEdad.val() === "" || !patt.test(txtEdad.val()) ){
    alert('Indique la edad del alumno');
    txtEdad.focus();
    return false;
  }
  if ( txtEscuela.val() === "" ){
    alert('Indique una escuela donde se inscribirá');
    txtEscuela.focus();
    return false;
  }
  return true;
}

/* Eventos */
btnBuscar.on('click', buscarAlumno);
btnCancelar.on('click', function(){
  pnlEditAlumno.addClass('hidden');
});
btnGuardar.on('click', editarAlumno);
tblAlumnos.delegate('.glyphicon-trash', 'click', eliminarAlumno);
tblAlumnos.delegate('.glyphicon-edit', 'click', getEditarAlumno);
$('#liEditarAlumno').addClass('active');