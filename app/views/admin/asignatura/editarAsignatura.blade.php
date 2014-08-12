@extends('admin.layout')

@section('title')
Editar asignatura | Sistema de Control Escolar
@stop

@section('css')
@stop

@section('content')

<!-- Encabezado -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-edit"></span>
	Editar asignatura
</h1>

<!-- Formulario -->
<div class="row">
	<div class="col-md-9">
		<div class="well">
			<div class="form-horizontal">
				<fieldset>
					<legend></legend>
					<div class="form-group">
						<label for="txtasigNombre" class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<input type="text" id="txtasigNombre" class="form-control input-sm" placeholder="Nombre" autofocus>
						</div>
					</div>

					<div class="form-group">
						<label for="txtasig" class="col-md-3 control-label">Clave</label>
						<div class="col-md-9">
							<input type="text" id="txtasigId" class="form-control input-sm" placeholder="Clave">
						</div>
					</div>

					<div class="form-group">
						<div class="col-md-9 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnGuardar">Guardar cambios</button>
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
{{HTML::script('js/admin/asignatura/editarAsignatura.js')}}
@stop