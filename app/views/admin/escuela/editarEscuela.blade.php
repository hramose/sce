@extends('admin.layout')

@section('title')
Editar escuela | Sistema de Control Escolar
@stop

@section('css')
@stop

@section('content')

<!-- Encabezado -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-edit"></span>
	Editar escuela
</h1>

<!-- Zona de búsqueda -->
<div class="row">
	<div class="col-md-8">
		<div class="form-horizontal">
			<fieldset>
				<div class="form-group">
					<label for="txtBuscar" class="col-md-2">Buscar</label>
					<div class="col-md-8">
						<input type="text" class="form-control input-sm" id="txtBuscar" placeholder="Zona | Nombre | CCT" autofocus>
					</div>
					<div class="col-md-2">
						<button class="btn btn-info btn-sm" id="btnBuscar">Buscar</button>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</div>

<!-- Tabla de escuelas encontradas -->
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive hidden" id="tblEscuelas"> 
			<table class="table table-striped table-hover"> 
				<thead>
					<tr>
						<th>CCT</th>
						<th>Nombre</th>
						<th>Zona</th>
						<th class="center">Teléfono</th>
						<th class="center">Status</th>
						<th class="center">Editar</th>
						<th class="center">Eliminar</th>
					</tr>
				</thead>
				<tbody id="tbodyEscuelas"></tbody>
			</table>
		</div>
	</div>
</div>

<!-- Panel editar escuela -->
<div class="row">
	<div class="col-md-10">
		<div class="well hidden" id="formEditar">
			<div class="form-horizontal">
				<fieldset>
					<legend></legend>
					<div class="form-group">
						<label for="txtId" class="col-md-3 control-label">CCT</label>
						<div class="col-md-9">
							<input type="text" id="txtId" class="form-control input-sm" placeholder="CCT" autofocus>
						</div>
					</div>

					<div class="form-group">
						<label for="txtNombre" class="col-md-3 control-label">Nombre</label>
						<div class="col-md-9">
							<input type="text" id="txtNombre" class="form-control input-sm" placeholder="Nombre">
						</div>
					</div>

					<div class="form-group">
						<label for="txtZona" class="col-md-3 control-label">Zona</label>
						<div class="col-md-9">
							<input type="text" id="txtZona" class="form-control input-sm" placeholder="Zona">
						</div>
					</div>

					<div class="form-group">
						<label for="txtDireccion" class="col-md-3 control-label">Dirección</label>
						<div class="col-md-9">
							<input type="text" id="txtDireccion" class="form-control input-sm" 
							placeholder="Calle | Número | Localidad | Municipio | Estado | C.P.">
						</div>
					</div>

					<div class="form-group">
						<label for="txtTelefono" class="col-md-3 control-label">Teléfono</label>
						<div class="col-md-9">
							<input type="text" id="txtTelefono" class="form-control input-sm" placeholder="Teléfono">
						</div>
					</div>

					<div class="form-group">
						<label for="txtDirector" class="col-md-3 control-label">Director</label>
						<div class="col-md-9">
							<input type="text" id="txtDirector" class="form-control input-sm" placeholder="Director">
						</div>
					</div>

					<div class="form-group">
						<label for="txtTurno" class="col-md-3 control-label">Turno</label>
						<div class="col-md-9">
							<select id="txtTurno" class="form-control input-sm">
								<option value="T">Turno</option>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label for="txtEstado" class="col-md-3 control-label">¿Activo?</label>
						<div class="col-md-9">
							<select id="sltEstado" class="form-control input-sm">
								<option value="1">Sí</option>
								<option value="0">No</option>
							</select>
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
{{HTML::script('js/admin/escuela/editarEscuela.js')}}
@stop