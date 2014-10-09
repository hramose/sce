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

<!-- Formulario de busqueda -->
<div class="row">
	<div class="col-md-8">
		<div class="form-horizontal">
			<fieldset>
				<div class="form-group">
					<label for="txtBuscar" class="col-md-2">Buscar</label>
					<div class="col-md-8">
						<input type="text" class="form-control input-sm" id="txtBuscar" placeholder="Área | Nombre" autofocus>
					</div>
					<div class="col-md-2">
						<button class="btn btn-info btn-sm" id="btnBuscar">Buscar</button>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</div>

<!-- Tabla de asignaturas enontradas -->
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive hidden" id="tblAsignatura">
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>Clave</th>
						<th>Nombre</th>
						<th>Área</th>
						<th class="center">Status</th>
						<th class="center">Editar</th>
						<th class="center">Eliminar</th>
					</tr>
				</thead>
				<tbody id="tbodyAsignatura"></tbody>
			</table>
		</div>
	</div>
</div>

<!-- Panel editar asinaturas -->
<div class="row">
	<div class="col-md-12">
		<div class="well hidden" id="formEditar">
			<div class="form-horizontal">
				<fieldset>
					<legend></legend>
					<div class="col-md-6">
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
							<label for="txtClave" class="col-md-3 control-label">Clave</label>
							<div class="col-md-9">
								<input type="text" id="txtClave" class="form-control input-sm" placeholder="Clave" maxlength="18" >
							</div>
						</div>

						<div class="form-group">
							<label for="txtNombre" class="col-md-3 control-label">Nombre</label>
							<div class="col-md-9">
								<input type="text" id="txtNombre" placeholder="Nombre" class="form-control input-sm">
							</div>
						</div>

						<div class="form-group">
							<label for="sltEstado" class="col-md-3 control-label">Estado</label>
							<div class="col-md-9">
								<select id="sltEstado" class="form-control input-sm">
									<option value="1">Activo</option>
									<option value="0">Inactivo</option>
								</select>
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
{{HTML::script('js/admin/asignatura/editar.js')}}
<script>
	$('#collapseAsig').addClass('in');
</script>
@stop