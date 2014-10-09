@extends('admin.layout')

@section('title')
Agregar ciclo | Sistema de Control Escolar
@stop

@section('content')
<!-- Encabezado de página -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-plus"></span> Agregar Ciclo
</h1>

<!-- Formulario -->
<div class="row">
	<div class="col-md-10">
		<div class="well">
			<div class="form-horizontal">
				<fieldset>
					<legend>Agregar</legend>


					<div class="form-group" id="numero">
							<label for="slctCiclo" class="col-md-3 control-label">Ciclo</label>
							<div class="col-md-3">
								<select id="slctCiclo" class="form-control input-sm">
									<option value="{{date("Y")}}-{{date("Y")+1}}">{{date("Y")}} - {{date("Y")+1}} </option>
								</select>
							</div>
					</div>

					<div class="form-group">
							<label for="slctGrado" class="col-md-3 control-label">Grado</label>
							<div class="col-md-3">
								<select id="slctGrado" class="form-control input-sm">
									<option value="1">1ero.</option>
									<option value="2">2do.</option>
									<option value="3">3ero.</option>
								</select>
							</div>
					</div>

					<div class="form-group">
							<label for="slctGrupo" class="col-md-3 control-label">Grupo</label>
							<div class="col-md-3">
								<select id="slctGrupo" class="form-control input-sm">
								</select>
							</div>
					</div>
					
					<div class="col-md-3 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnAgregar">Aceptar</button>
							<button class="btn btn-danger btn-sm" id="btnCancelar">Cancelar</button>
					</div>

				</fieldset>
			</div>
		</div>
	</div>
</div>
@stop

@section('js')
{{ HTML::script('js/admin/ciclo/agregar.js') }}
@stop