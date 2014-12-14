@extends('admin.layout')

@section('title')
Agregar profesor | Sistema de Control Escolar
@stop

@section('content')

<!-- Encabezado de página -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-plus"></span> Asignar Orientador
</h1>
<div class="row">
	<div class="col-md-10">
		<div class="well">
			<div class="form-horizontal">
				<fieldset>

					<div class="form-group">
							<label for="slctCiclos" class="col-md-3 control-label">Ciclo</label>
							<div class="col-md-3">
								<select id="slctCiclos" class="form-control input-sm">
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
							<label for="slctProfesor" class="col-md-3 control-label">Profesor</label>
							<div class="col-md-3">
								<select id="slctProfesor" class="form-control input-sm">
								</select>
							</div>
					</div>


					<div class="col-md-3 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnAsignar">Asignar</button>
							<button class="btn btn-danger btn-sm" id="btnCancelar">Cancelar</button>
					</div>



				</fieldset>
			</div>
		</div>
	</div>
</div>

@stop

@section('js')
{{ HTML::script('js/admin/orientador/asignar.js') }}

@stop
