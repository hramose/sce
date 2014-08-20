@extends('admin.layout')

@section('title')
Agregar grupo | Sistema de Control Escolar
@stop

<!-- Encabezado de página -->
@section('content')
<h1 class="page-header" id="page-header">
  <span class="glyphicon glyphicon-plus"></span> Agregar Grupo
</h1>

<!-- Formulario -->
<div class="row">
  <div class="col-md-10">
    <div class="well">
      <div class="form-horizontal">

          <div class="form-group" id="numero">
              <label for="txtGRupo" class="col-md-3 control-label">Numero de Grupos</label>
              <div class="col-md-3">
              <input type="text" id="txtNumeroGrupo" placeholder="Numero de grupos a ingrear" class="form-control input-sm">
              </div>
            <div class="col-md-4">
                <button class="btn btn-success btn-sm" id="btnAgregar">Aceptar</button>
                <button class="btn btn-danger btn-sm" id="btnCancelar">Cancelar</button>
            </div>
          </div>

          <div class="form-group"style="display:none" id="nombre">
          <legend>Nombre de los grupos</legend>
              <label for="txtCiclo" class="col-md-3 control-label">Nombre del Grupos</label>
              <div class="col-md-3">
                <input type="text" id="txtNombreGrupo" placeholder="Nombre del grupo" class="form-control input-sm">
              </div>
            <div class="col-md-4">
                <button class="btn btn-success btn-sm" id="btnAgregarNombre">Agregar</button>
                <button class="btn btn-danger btn-sm" id="btnCancelarNombre">Cancelar</button>

            </div>
          </div>


      </div>
    </div>
  </div>
</div>


@stop

@section('js')
{{ HTML::script('js/admin/grupo/agregar.js') }}
@stop
