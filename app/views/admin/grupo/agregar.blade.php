@extends('admin.layout')

@section('title')
Agregar profesor | Sistema de Control Escolar
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
    
      <legend>Nombre de los Grupos</legend>
      <div class="col-md-9">
        <div class="form-group">
          <label for="txtNombreGrupo" class="col-md-3 control-label">Nombre del </label>
          <div class="col-md-5">
            <input type="text" id="txtNombreGrupo" class="form-control input-sm" placeholder="Nombre" maxlength="18" autofocus>
          </div>
          <div class="col-md-5 col-md-offset-8">
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
