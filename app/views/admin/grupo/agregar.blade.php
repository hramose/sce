@extends('admin.layout')

@section('title')
Agregar grupo | Sistema de Control Escolar
@stop

<!-- Encabezado de página -->
@section('content')
<h1 class="page-header" id="page-header">
  <span class="glyphicon glyphicon-plus"></span> Agregar - Editar Grupo
</h1>

<!-- Formulario -->
<div class="row">
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">
        <fieldset>
          <legend>Nombre del Grupo</legend>

          <div class="form-group">
            <label for="txtNombreGrupo" class="col-md-3 control-label">Nombre del Grupo</label>
            <div class="col-md-9">
              <input type="text" class="form-control input-sm" id="txtNombreGrupo" placeholder="Nombre del grupo">
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-9 col-md-offset-3">
              <button class="btn btn-success btn-sm" id="btnAgregarNombre">Guardar</button>
              <button class="btn btn-danger btn-sm" id="btnCancelarNombre">Cancelar</button>
            </div>
          </div>

        </fieldset>

      </div>
    </div>
  </div>
</div>

<!-- Editar grupos -->
<div class="row">
  <!-- Tabla de grupos encontradas -->
  <div class="col-md-6">
    <div class="table-responsive hidden" id="tblGrupo">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th class="col-md-2">Estado</th>
          </tr>
        </thead>
        <tbody id="tbodyGrupo"></tbody>
      </table>
    </div>
  </div>
  
  <!-- Panel editar grupo -->
  <div class="col-md-6">
    <div class="well hidden" id="formEditarG">
      <div class="form-horizontal">
        <fieldset>
          <legend>Editar Grupos</legend>

          <div class="form-group hidden">
            <label for="txtId" class="col-md-3 control-label">Numero</label>
            <div class="col-md-9">
              <input type="text" id="txtId" class="form-control input-sm" placeholder="Numero" autofocus>
            </div>
          </div>


          <div class="form-group">
            <label for="txtNombreG" class="col-md-3 control-label">Nombre</label>
            <div class="col-md-9">
              <input type="text" id="txtNombreG" class="form-control input-sm" placeholder="Nombre">
            </div>
          </div>

          <div class="form-group">
            <label for="slctEstadoG" class="col-md-3 control-label">¿Activo?</label>
            <div class="col-md-9">
              <select id="slctEstadoG" class="form-control input-sm">
                <option value="1">Sí</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-9 col-md-offset-3">
              <button class="btn btn-success btn-sm" id="btnGuardarG">Guardar cambios</button>
              <button class="btn btn-danger btn-sm" id="btnCancelarG">Cancelar</button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>
@stop

@section('js')
{{ HTML::script('js/admin/grupo/agregar.js') }}
@stop