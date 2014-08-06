@extends('admin.layout')

@section('title')
Agregar profesor | Sistema de Control Escolar
@stop

@section('content')
<!-- Encabezado de página -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-plus"></span> Agregar Profesor
</h1>

<!-- Formulario -->
<div class="row">
	<div class="col-md-10">
		<div class="well">
			<div class="form-horizontal">
				<fieldset>
					<legend>Agregar</legend>
					<div class="form-group">
						<label for="txtCurpP" class="col-md-3 control-label">CURP</label>
						<div class="col-md-9">
							<input type="text" id="txtCurpP" class="form-control input-sm" placeholder="CURP" maxlength="18" onblur="pasarMayusculas()" autofocus>
						</div>
					</div>

					<div class="form-group">
						<label for="txtNombreP" class="col-md-3 control-label">Nombre completo</label>
						<div class="col-md-9">
							<input type="text" id="txtNombreP" placeholder="Nombre(s) y Apellidos" class="form-control input-sm" >
						</div>
					</div>

					<div class="form-group">
						<label for="txtPerfilP" class="col-md-3 control-label">Perfil</label>
						<div class="col-md-9">
							<input type="text" id="txtPerfilP" placeholder="Perfil Profesional" class="form-control input-sm">
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
							<input type="text" class="form-control input-sm" id="txtDireccionP" placeholder="Calle, Número, Colonia, Municipio, Estado">
						</div>
					</div>

					<div class="form-group">
						<label for="txtOrientadorP" class="col-md-3 control-label">Orientador</label>
						<div class="col-md-9">
							<select id="txtOrientadorP" class="form-control input-sm">
								<option value="0">No</option>
								<option value="1">Sí</option>
							</select>
						</div>
					</div>


					<div class="form-group">
						<div class="col-md-9 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnAgregarP">Agregar</button>
							<button class="btn btn-danger btn-sm" id="btnCancelarP">Cancelar</button>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>
</div>
@stop

@section('js')
{{ HTML::script('js/admin/profesor/agregar.js') }}
{{ HTML::script('js/admin/profesor/ValidarDatos.js') }}	<!-- para acceder a funciones desde editar.js -->
@stop
