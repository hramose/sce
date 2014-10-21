@extends('admin.layout')

@section('title')
Editar calificación | Sistema de Control Escolar
@stop

@section('css')
@stop

@section('content')

<!-- Encabezado -->
<h1 class="page-header" id="page-header">
  <span class="glyphicon glyphicon-edit"></span>
  Editar calificación
</h1>

<!-- Formulario de busqueda -->
<div class="row">
  <div class="col-md-8">
    <div class="form-horizontal">
      <fieldset>
        <div class="form-group">
          <label for="txtBuscar" class="col-md-3">Buscar alumno</label>
          <div class="col-md-7">
            <input type="text" class="form-control input-sm" id="txtBuscar" placeholder="Apellidos | Nombre | CURP" autofocus>
          </div>
          <div class="col-md-2">
            <button class="btn btn-info btn-sm" id="btnBuscar">Buscar</button>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</div>

<!-- Tabla de alumnos enontradas -->
<div class="row" id=>
  <div class="col-md-12">
    <div class="table-responsive hidden" id="tblCalificacion">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th class="center">Asignatura</th>
            <th class="center">Bimestre</th>
            <th class="center">Grado</th>
            <th class="center">Ciclo Escolar</th>
            <th class="center">Editar</th>
          </tr>
        </thead>
        <tbody id="tbodyCalificacion"></tbody>
      </table>
    </div>
  </div>
</div>

<!-- Panel editar calificacion -->
<div class="row hidden" id="pnlEditarCal">
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">
        <fieldset>
          <div id = "secCalificacion">
            <legend></legend>
            <div class="form-group">
              <label for="sltIdentificador" class="col-md-3 control-label">Alumno</label>
              <div class="col-md-9">
                <select id="sltIdentificador" class="form-control input-sm">
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="sltAsignatura" class="col-md-3 control-label">Asignatura</label>
              <div class="col-md-9">
                <select id="sltAsignatura" class="form-control input-sm" >
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="sltBimestre" class="col-md-3 control-label">Bimestre</label>
              <div class="col-md-9">
                <input type="text" id="sltBimestre" class="form-control input-sm" disabled>
              </div>
            </div>
            <div class="form-group">
              <label for="txtCalificacion" class="col-md-3 control-label">Calificación</label>
              <div class="col-md-9">
                <input type="text" id="txtCalificacion" class="form-control input-sm" placeholder="Calificación">
              </div>
            </div>

            <div class="form-group">
              <label for="sltProfesor" class="col-md-3 control-label">Profesor(a)</label>
              <div class="col-md-9">
                <select id="sltProfesor" class="form-control input-sm">
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-9 col-md-offset-3">
            <button class="btn btn-success btn-sm" id="btnGuardar">Guardar cambios</button>
            <button class="btn btn-danger btn-sm" id="btnCancelar">Cancelar</button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>
@stop

@section('js')
 {{HTML::script('js/admin/calificacion/editar.js')}}
<script>
  $('#collapseCal').addClass('in');
</script>
@stop
