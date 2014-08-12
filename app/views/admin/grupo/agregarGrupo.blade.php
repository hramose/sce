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
      <legend>Selecciona el número de grupos a agregar  </legend>
        <div class="form-group">
              <label for="txtGrupo" class="col-md-1 col-md-offset-3 ">Grupo</label>
              <select id="txtGrupo" div class="col-md-1" >
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>

        <div class="col-md-8 col-md-offset-5">
            <button class="btn btn-success btn-sm" id="btnAgregar">Agregar</button>
            <button class="btn btn-danger btn-sm" id="btnCancelar">Cancelar</button>
        </div>
        </div>

      </div>
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
