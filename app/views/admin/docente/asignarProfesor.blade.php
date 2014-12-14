@extends('admin.layout')

@section('title')
Asignar Profesor | Sistema de Control Escolar
@stop

@section('content')

<!-- Encabezado de página -->
<h1 class="page-header" id="page-header">
  <span class="glyphicon glyphicon-plus"></span> Asignar Profesor
</h1>

<!-- Formulario Seleccionar Grupo-->
<div class="row" id="pnlSelectAlumno">
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">
        <fieldset>
          <legend>Grupo</legend>

          <div class="form-group">
            <label for="sltCiclo" class="col-md-3 control-label">Ciclo</label>
            <div class="col-md-9">
              <select id="sltCiclo" class="form-control input-sm">
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="sltGrado" class="col-md-3 control-label">Grado</label>
            <div class="col-md-9">
              <select id="sltGrado" class="form-control input-sm">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="sltGrupo" class="col-md-3 control-label">Grupo</label>
            <div class="col-md-9">
              <select id="sltGrupo" class="form-control input-sm">
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="txtNAsignatura" class="col-md-3 control-label">Numero Asignaturas</label>
            <div class="col-md-9">
              <input type="text" id="txtNAsignatura" placeholder="Numero de asignaturas para el grupo" class="form-control input-sm">

            </div>
          </div>

          <div class="form-group">
            <div class="col-md-9 col-md-offset-3">
              <button class="btn btn-info btn-sm" id="btnSeleccionarAlumno">Seleccionar</button>
            </div>
          </div>

        </fieldset>

      </div>
    </div>
  </div>
</div>


<!-- Formulario Profesor ASignatura-->
<div class="row" id="pnlProfesorAsignatura" >
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">
        <fieldset >
          <legend>Profesor-Asignatura</legend>
          <div class="form-group" id='formSelect' >

          </div>
        </fieldset>

      </div>
    </div>
  </div>
</div>

@stop

@section('js')
{{ HTML::script('js/admin/docente/asignarProfesor.js') }}
<script>
  $('#collapseDocentes').addClass('in');
</script>
@stop
