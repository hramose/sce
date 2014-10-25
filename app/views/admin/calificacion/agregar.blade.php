@extends('admin.layout')

@section('title')
Agregar calificación | Sistema de Control Escolar
@stop

@section('css')
@stop

@section ('content')
<!-- Encabezado -->
<h1 class="page-header" id="page-header">
  <span class="glyphicon glyphicon-plus"></span>
  Agregar calificación
</h1>

<!-- Formulario Seleccionar Alumnos-->
<div class="row" id="formSelectAlumno">
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">
        <fieldset>
          <legend>Seleccionar Grupo</legend>

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
            <div class="col-md-9 col-md-offset-3">
              <button class="btn btn-info btn-sm" id="btnSeleccionarAlumno">Seleccionar</button>
            </div>
          </div>

        </fieldset>

      </div>
    </div>
  </div>
</div>


<!-- Formulario Agregar-->
<div class="row hidden" id="pnlAgregarCal">
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">
        <fieldset>
          <legend>Agregar Calificación</legend>
          <div id = "secCalificacion">
            <div class="form-group">
              <div class="col-md-4">
                <input type="text" id="datoGrupo" class="form-control input-sm" disabled>
              </div>
            </div>
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
                <select id="sltAsignatura" class="form-control input-sm">
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="sltBimestre" class="col-md-3 control-label">Bimestre</label>
              <div class="col-md-9">
                <select id="sltBimestre" class="form-control input-sm">
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                  <option value="5">V</option>
                </select>
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
            <button class="btn btn-success btn-sm" id="btnAgregar">Agregar</button>
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
 {{HTML::script('js/admin/calificacion/agregar.js')}}
<script>
 $('#collapseCal').addClass('in');
</script>
@stop
