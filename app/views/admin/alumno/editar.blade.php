@extends('admin.layout')

@section('title')
Editar Alumno | Sistema de Control Escolar
@stop

@section('content')
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-edit"></span> Editar alumno
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

<!-- Tabla de alumnos enontrados -->
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive hidden" id="tblAlumnos">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th class="center">#</th>
						<th>CURP</th>
						<th>Nombre</th>
						<th>Padre o tutor</th>
						<th class="center">Teléfono</th>
						<th class="center">Status</th>
						<th class="center">Editar</th>
						<th class="center">Eliminar</th>
					</tr>
				</thead>
				<tbody id="tbodyAlumnos"></tbody>
			</table>
		</div>
	</div>
</div>

<!-- Panel editar alumno -->
<div class="row hidden" id="pnlEditAlumno">
	<div class="col-md-12">
		<div class="well">
			<div class="form-horizontal">
				<fieldset>
					<legend>Editar alumno</legend>
					<div class="col-md-6">
						<div class="form-group">
							<label for="txtCurp" class="col-md-3 control-label">CURP</label>
							<div class="col-md-9">
								<input type="text" id="txtCurp" class="form-control input-sm" placeholder="CURP" maxlength="18" autofocus>
							</div>
						</div>

						<div class="form-group">
							<label for="txtApep" class="col-md-3 control-label">Apellido paterno</label>
							<div class="col-md-9">
								<input type="text" id="txtApep" placeholder="Apellido paterno" class="form-control input-sm">
							</div>
						</div>

						<div class="form-group">
							<label for="txtApem" class="col-md-3 control-label">Apellido materno</label>
							<div class="col-md-9">
								<input type="text" id="txtApem" placeholder="Apellido materno" class="form-control input-sm">
							</div>
						</div>

						<div class="form-group">
							<label for="txtNombre" class="col-md-3 control-label">Nombre(s)</label>
							<div class="col-md-9">
								<input type="text" id="txtNombre" placeholder="Nombre(s)" class="form-control input-sm">
							</div>
						</div>

						<div class="form-group">
							<label for="txtSexo" class="col-md-3 control-label">Sexo</label>
							<div class="col-md-9">
								<select id="txtSexo" class="form-control input-sm">
									<option value="M">Masculino</option>
									<option value="F">Femenino</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="txtTutor" class="col-md-3 control-label">Padre o tutor</label>
							<div class="col-md-9">
								<input type="text" id="txtTutor" placeholder="Padre o tutor" class="form-control input-sm">
							</div>
						</div>

						<div class="form-group">
							<label for="txtTelefono" class="col-md-3 control-label">Teléfono</label>
							<div class="col-md-9">
								<input type="text" class="form-control input-sm" id="txtTelefono" placeholder="Teléfono">
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<div class="form-group">
							<label for="txtDireccion" class="col-md-3 control-label">Dirección</label>
							<div class="col-md-9">
								<input type="text" class="form-control input-sm" id="txtDireccion" placeholder="Dirección">
							</div>
						</div>

						<div class="form-group">
							<label for="txtEdad" class="col-md-3 control-label">Edad</label>
							<div class="col-md-9">
								<input type="text" class="form-control input-sm" id="txtEdad" placeholder="Edad" maxlength="2">
							</div>
						</div>

						<div class="form-group">
							<label for="txtEscuela" class="col-md-3 control-label">Escuela</label>
							<div class="col-md-9">
								<select id="txtEscuela" class="form-control input-sm">
									<option value="1">Escuela registrada</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="txtActivo" class="col-md-3 control-label">¿Activo?</label>
							<div class="col-md-9">
								<select name="" id="txtActivo" class="form-control input-sm">
									<option value="1">Sí</option>
									<option value="0">No</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="txtObservacion" class="col-md-3 control-label">Observaciones</label>
							<div class="col-md-9">
								<textarea name="" id="txtObservacion" rows="5" class="form-control" placeholder="Observaciones"></textarea>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-9 col-md-offset-3">
								<button class="btn btn-success btn-sm" id="btnGuardar">Guardar cambios</button>
								<button class="btn btn-danger btn-sm" id="btnCancelar">Cancelar</button>
							</div>
						</div>						
					</div>
				</fieldset>
			</div>
		</div>
	</div>
</div>
@stop

@section('js')
{{ HTML::script('js/admin/alumno/editar.js') }}
@stop