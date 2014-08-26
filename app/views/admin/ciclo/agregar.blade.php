@extends('admin.layout')

@section('title')
Agregar profesor | Sistema de Control Escolar
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
							<label for="txtCiclo" class="col-md-3 control-label">Ciclo</label>
							<div class="col-md-3">
								<select id="txtCiclo" class="form-control input-sm">
									<option value="0">Selecciona el Ciclo</option>
									<option value="{{date("Y")}}-{{date("Y")+1}}">{{date("Y")}} - {{date("Y")+1}} </option>
								</select>
							</div>
					</div>



					<div class="form-group" id="grupo">
							<label for="txtGrupo" class="col-md-3 control-label">Grupo</label>
							<div class="col-md-3">
								<select id="txtGrupo" class="form-control input-sm">
									<option value="0">Selecciona el Ciclo</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
							</div>
					</div>

					<div class="form-group" id="grado">
							<label for="txtGrado" class="col-md-3 control-label">Grado</label>
							<div class="col-md-3">
								<select id="txtrGado" class="form-control input-sm">
									<option value="0">Selecciona el Ciclo</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
								</select>
							</div>
					</div>

					<div class="col-md-6 control-label">
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
