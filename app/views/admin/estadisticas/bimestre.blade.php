@extends('admin.layout')

@section('title')
Estadísticas Bimestrales | Sistema de Control Escolar
@stop

@section('css')
@stop

@section ('content')

<!-- Encabezado de página -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-list-alt"></span> Estadísticas Bimestrales
</h1>


<!-- Seleccion de ciclo, grupo, bimestre y asignatura-->
<div class="row">
  	<div class="col-md-10 col-md-offset-1">
    	<div class="well">
			<div class="form-horizontal">
				<fieldset>
					<div class="form-group">
						<label for="slctCiclo" class="col-md-3 control-label">Ciclo
						</label>
						<div class="col-md-8">
							<select  id="slctCiclo" class="form-control input-sm">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="slctGrado" class="col-md-3 control-label">Grupo
						</label>
						<div class="col-md-8">
							<select  id="slctGrado" class="form-control input-sm">
							</select>
						</div>	
					</div>
					<div class="form-group">
			            <label for="slctBimestre" class="col-md-3 control-label">Bimestre</label>
			            <div class="col-md-8">
			                <select id="slctBimestre" class="form-control input-sm">
				                  <option value="1">I</option>
				                  <option value="2">II</option>
				                  <option value="3">III</option>
				                  <option value="4">IV</option>
				                  <option value="5">V</option>
			                </select>
			            </div>
		            </div>
					<div class="col-md-8 col-md-offset-5">				
					 <div>
						<button class="btn btn-info btn-sm" id="btnVer">Ver estadísticas</button>
					</div>
				  </div>
				</fieldset>
			</div>
		</div>
	</div>
</div>



<!-- Tabla estadisticas de un grupo de acuerdo a un bimestre elegido-->
<div class="row hidden" id="pnlEstadisticasGrup">
	<div class="col-md-12">
		<div class="well">
			<div class="form-horizontal">
				<fieldset><legend id="legendTable" class="center"></legend>
				 	<div class="col-md-12">
						<div  class= "well" class="form-horizontal">
							<div class="form-group">
								<label id="labelBime"></label>
						 		<div class="table-responsive" id="tblEstadisticas">
									<table class="table table-striped table-hover">
										<thead>
											<tr>
												<th>CURP Alumno</th>
												<th>Nombre Alumno</th>
												<th>Asignatura</th>
												<th class="center">Calificacion Bimestre</th>
											</tr>
										</thead>
										<tbody id="tbodyEstadisticas"></tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
						<div class="col-md-6">
							<div>
							 	<legend id="TotalAlumnos"></legend> 
							</div>
						</div>
						<div class="col-md-12">
							<div class= "well">
								<div class="form-horizontal">
									<div class="form-group">
				           			 	<legend><h4>Número de alumnos aprobados/reprobados: </h4></legend>
										<div  id="tblEstadistGrupo">
											<table class="table table-striped table-hover">
												<thead>
													<tr>
														<th>Clave</th>
														<th>Área</th>
														<th>Asignatura</th>
														<th>Apro</th>
														<th>Repr</th>
													</tr>
												</thead>
												<tbody id="tbodyEstadistGrupo"></tbody>
											</table>
										</div>	
									</div>	
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<div class= "well">
							<div class="form-group">
								<legend><h4>Alumnos con calificación de: </h4></legend>
								<div id="tblEstadistAlu">
									<table class="table table-striped table-hover">
										<thead>
										<tr>
											<th>Área</th>
											<th>Asignatura</th>
											<th>9-10</th>
										    <th>8-9</th>
											<th>7-8</th>
											<th>6-7</th>
											<th>5-6</th>
										</tr>
										</thead>
										<tbody id="tbodyEstadistAlu"></tbody>
									</table>
								</div>
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
{{ HTML::script('js/admin/estadisticas/bimestre.js') }}
<script>
	$('#collapseEst').addClass('in');
</script>
@stop