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
							<label for="txtNombre" class="col-md-3 control-label">Nombre</label>
							<div class="col-md-9">
								<input type="text" id="txtNombre" class="form-control input-sm" placeholder="Nombre" autofocus>
							</div>
						</div>
						<div class="form-group">
							<label for="txtId" class="col-md-3 control-label">Clave</label>
							<div class="col-md-9">
								<input type="text" id="txtId" class="form-control input-sm" placeholder="Clave">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-9 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnAgregarAsignatura">Agregar</button>
							<button class="btn btn-danger btn-sm" id="btnCancelarAsignatura">Cancelar</button>
							</div>
						</div>
						<legend></legend>
					</div>

					<div id = "secTecnologia">
						<div class="form-group">
							<label for="txtEnfasisTec" class="col-md-3 control-label">Tecnología</label>
							<div class="col-md-9">
								<select id="txtEnfasisTec" class="form-control input-sm">
									<option value="I">Tecnología I</option>
									<option value="II">Tecnología II</option>
									<option value="III">Tecnología III</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="txtNombreTec" class="col-md-3 control-label">Énfasis</label> 
							<div class="col-md-9">
								<input type="text" id="txtNombreTec" class="form-control input-sm" placeholder="Nombre">	
							</div>
						</div>
						<div class="form-group">
							<label for="txtClaveTec" class="col-md-3 control-label">Clave</label>
							<div class="col-md-9">
								<input type="text" id="txtClaveTec" class="form-control input-sm" placeholder="Clave">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-9 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnAgregarTecnologia">Agregar</button>
							<button class="btn btn-danger btn-sm" id="btnCancelarTecnologia">Cancelar</button>
							</div>
						</div>
						<legend></legend>
					</div>

					<div id = "secArtes">
						<div class="form-group">
							<label for="txtDisciplinaArt" class="col-md-3 control-label">Artes</label>
							<div class="col-md-9">
								<select id="txtDisciplinaArt" class="form-control input-sm">
									<option value="I">Artes I</option>
									<option valu="II">Artes II</option>
									<option value="III">Artes III</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="txtNombreArt" class="col-md-3 control-label">Disciplina</label>
							<div class="col-md-9">
								<input type="text" id="txtNombreArt" class="form-control input-sm" placeholder="Nombre">
							</div>
						</div>
						<div class="form-group">
							<label for="txtClaveArt" class="col-md-3 control-label">Clave</label>
							<div class="col-md-9">
								<input type="text" id="txtClaveArt" class="form-control input-sm" placeholder="Clave">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-9 col-md-offset-3">
							<button class="btn btn-success btn-sm" id="btnAgregarArte">Agregar</button>
							<button class="btn btn-danger btn-sm" id="btnCancelarArte">Cancelar</button>
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
{{HTML::script('js/admin/asignatura/agregarAsignatura.js')}}
{{HTML::script('js/admin/asignatura/agregarTecnologia.js')}}
{{HTML::script('js/admin/asignatura/agregarArte.js')}}	
@stop
