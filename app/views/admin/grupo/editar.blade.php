@extends('admin.layout')

@section('title')
Editar grupo | Sistema de Control Escolar
@stop

@section('css')
@stop

@section('content')

<!-- Encabezado -->
<h1 class="page-header" id="page-header">
  <span class="glyphicon glyphicon-edit"></span>
  Editar grupos
</h1>


<!-- Tabla de grupos encontradas -->
<div class="row">
  <div class="col-md-12">
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
</div>

<!-- Panel editar grupo -->
<div class="row">
  <div class="col-md-10">
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
{{ HTML::script('js/admin/grupo/editar.js') }}
@stop
