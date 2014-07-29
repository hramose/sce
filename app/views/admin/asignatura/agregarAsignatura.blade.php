@extends('admin.layout')

@section('title')
Agregar asignatura | Sistema de Control Escolar
@stop

@section('css')
@stop

@section ('content')
<!-- Encabezado -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-plus"></span>
	Agregar asignatura
</h1>

<!-- Formulario -->
<div class="row">
	<div class="col-md-10">
		<div class="well">
			<div class="form-horizontal">
				<fieldset>
					<legend></legend>
					<div class="form-group">
						<label for="txtId" class="col-md-3 control-label">Clave</label>
						<div class="col-md-9">
							<input type="text" id="txtId" class="form-control input-sm" placeholder="Clave" autofocus>
						</div>
					</div>

					<div class="form-group">
						<label for="txtNombre" class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<input type="text" id="txtNombre" class="form-control input-sm" placeholder="Nombre" >
						</div>
					</div>

					<div class="form-group">
						<label for="txtEstado" class="col-md-3 control-label">Estado</label>
						<div class="col-md-9">
							<select id="txtEstado" class="form-control input-sm">
								<option value="A">Activo</option>
								<option value="I">Inactivo</option>
							</select>
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
{{HTML::script('js/admin/asignatura/agregarAsignatura.js')}}
@stop