@extends('admin.layout')

@section('title')
Editar Profesor | Sistema de Control Escolar
@stop

@section('content')
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-edit"></span> Editar profesor
</h1>

<div class="row">
	<div class="col-md-8">
		<div class="form-horizontal">
			<fieldset>
				<div class="form-group">
					<label for="txtBuscar" class="col-md-2">Buscar</label>
					<div class="col-md-8">
						<input type="text" class="form-control input-sm" id="txtBuscar" placeholder="Apellidos | Nombre | CURP">
					</div>
					<div class="col-md-2">
						<button class="btn btn-info btn-sm" id="btnBuscar">Buscar</button>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</div>


<!-- Tabla de profesores encontrados -->
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive hidden" id="tblProfesor"> <!--barra horizontal dispositivos peque;os -->
			<table class="table table-striped table-hover"> <!--tabla, tabla-cebreada, tbody fila dinamica -->
				<thead>
					<tr>
						<th class="center">#</th>
						<th>CURP</th>
						<th>Nombre</th>
						<th>Perfil</th>
						<th class="center">Teléfono</th>
						<th class="center">Status</th>
						<th class="center">Editar</th>
						<th class="center">Eliminar</th>
					</tr>
				</thead>
				<tbody id="tbodyProfesor"></tbody>
			</table>
		</div>
	</div>
</div>

<!-- Panel editar profesor -->
<div class="row">
	<div class="col-md-11">
		<div class="well hidden"id="formEditar"> <!--al inicio formulario oculto -->
			<div class="form-horizontal">
				<fieldset>
					<legend>Editar profesor</legend>
					<div class="col-md-12">
						<div class="form-group">
							<label for="txtCurpP" class="col-md-3 control-label">CURP</label>
							<div class="col-md-9">
								<input type="text" id="txtCurpP" class="form-control input-sm" placeholder="CURP" maxlength="18" onblur="pasarMayusculas()" autofocus>
							</div>
						</div>

						<div class="form-group">
							<label for="txtNombreP" class="col-md-3 control-label">Nombre completo</label>
							<div class="col-md-9">
								<input type="text" id="txtNombreP" placeholder="Nombre completo" class="form-control input-sm">
							</div>
						</div>

						<div class="form-group">
							<label for="txtPerfilP" class="col-md-3 control-label">Perfil</label>
							<div class="col-md-9">
								<input type="text" id="txtPerfilP" class="form-control input-sm" placeholder="Perfil profesional">
							</div>
						</div>

						<div class="form-group">
							<label for="txtTelefonoP" class="col-md-3 control-label">Teléfono</label>
							<div class="col-md-9">
								<input type="text" class="form-control input-sm" id="txtTelefonoP" placeholder="Teléfono">
							</div>
						</div>


						<div class="form-group">
							<label for="txtDireccionP" class="col-md-3 control-label">Dirección</label>
							<div class="col-md-9">
								<input type="text" class="form-control input-sm" id="txtDireccionP" placeholder="Dirección">
							</div>
						</div>


						<div class="form-group">
							<label for="slctEstadoP" class="col-md-3 control-label">¿Activo?</label>
							<div class="col-md-9">
								<select name="" id="slctEstadoP" class="form-control input-sm">
									<option value="1">Sí</option>
									<option value="0">No</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="slctOrientadorP" class="col-md-3 control-label">Orientador</label>
							<div class="col-md-9">
								<select id="slctOrientadorP" class="form-control input-sm">
									<option value="0">No</option>
									<option value="1">Sí</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-9 col-md-offset-3">
								<button class="btn btn-success btn-sm" id="btnGuardarP">Guardar cambios</button>
								<button class="btn btn-danger btn-sm" id="btnCancelarP">Cancelar</button>
							</div>
						</div>



					</div>

					<div class="form-group">

					</div>
				</fieldset>
			</div>
		</div>
	</div>
</div>

@stop


@section('js')
{{ HTML::script('js/admin/profesor/editar.js') }}
{{ HTML::script('js/admin/profesor/ValidarDatos.js') }}	<!-- para acceder a funciones desde editar.js -->
@stop
