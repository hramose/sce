@extends('admin/layout')

@section('title')
Editar turno | Sistema de Control Escolar
@stop

@section('css')
@stop

@section('content')

<!-- Encabezado -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-plus"></span>
	Editar turno
</h1>

<!-- Zona de búsqueda -->
<div class="row">
	<div class="col-md-8">
		<div class="form-horizontal">
			<fieldset>
				<div class="form-group">
					<label for="txtBuscar" class="col-md-2">Buscar</label>
					<div class="col-md-8">
						<input type="text" class="form-control input-sm" id="txtBuscar" placeholder="Nombre | Clave" autofocus>
					</div>
					<div class="col-md-2">
						<button class="btn btn-info btn-sm" id="btnBuscar">Buscar</button>
					</div>
				</div>
			</fieldset>
		</div>
	</div>
</div>

<!-- Tabla de turnos encontradas -->
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive hidden" id="tblTurnos"> 
			<table class="table table-striped table-hover"> 
				<thead>
					<tr>
						<th>Clave</th>
						<th>Nombre</th>
						<th class="center">Status</th>
						<th class="center">Editar</th>
						<th class="center">Eliminar</th>
					</tr>
				</thead>
				<tbody id="tbodyTurnos"></tbody>
			</table>
		</div>
	</div>
</div>


<!-- Panel editar turno -->
<div class="row">
	<div class="col-md-10">
		<div class="well" id="formEditar">
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
							<select id="sltNombre" class="form-control input-sm">
								<option value="Matutino">Matutino</option>
								<option value="Vespertino">Vespertino</option>
								<option value="Tiempo completo">Tiempo completo</option>
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
{{HTML::script('js/admin/turno/editarTurno.js')}}
@stop