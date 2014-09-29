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


          <div class="form-group" id="nombre">
          <legend>Nombre del Grupo</legend>
              <label for="txtGrupos" class="col-md-3 control-label"></label>
                <div class="col-md-4">

            
              <input type='text' id='txtNombreGrupo'placeholder='Nombre del grupo' class='form-control input-sm'>
              </div>

                
                <button class="btn btn-success btn-sm" id="btnAgregarNombre">Agregar</button>
                <button class="btn btn-danger btn-sm" id="btnCancelarNombre">Cancelar</button>
              </div>
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
