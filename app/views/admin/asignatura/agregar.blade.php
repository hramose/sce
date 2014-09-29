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
					<div id = "secAsignatura">
						<legend></legend>
						<div class="form-group">
							<label for="sltArea" class="col-md-3 control-label">Área</label>
							<div class="col-md-9">
								<select id="sltArea" class="form-control input-sm">
									<option value="Asignatura">Asignatura</option>
									<option value="Artes">Taller de Artes</option>
									<option value="Tecnología">Taller de Tecnología</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="txtNombre" class="col-md-3 control-label">Nombre</label>
							<div class="col-md-9">
								<input type="text" id="txtNombre" class="form-control input-sm" placeholder="Nombre" autofocus>
							</div>
						</div>
						<div class="form-group">
							<label for="txtClave" class="col-md-3 control-label">Clave</label>
							<div class="col-md-9">
								<input type="text" id="txtClave" class="form-control input-sm" placeholder="Clave">
							</div>
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
{{HTML::script('js/admin/asignatura/agregar.js')}}
{{HTML::script('js/admin/asignatura/validar.js')}}	
@stop
