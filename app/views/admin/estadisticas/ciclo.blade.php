@extends('admin.layout')

@section('title')
Estadísticas Ciclo | Sistema de Control Escolar
@stop

@section('css')
@stop

@section ('content')

<!-- Encabezado de página -->
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-list-alt"></span> Estadísticas Ciclo
</h1>

<!-- Seleccion de ciclo y grupo-->
<div class="row" id="pnlSelectEstadisticas">
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

<!-- Tabla estadisticas de un grupo en todo el ciclo-->
<div class="row hidden" id="pnlEstadisticasGrup">
	<div class="col-md-12">
		<div class="well">
			<div class="form-horizontal">
				<fieldset id="field"><legend id="legendTable" class="center"></legend>
				 	<div class="col-md-12">
						<div  class= "well" class="form-horizontal">
							<div class="form-group">
						 		<legend align="center"><h4>Promedios bimestrales</h4></legend>		
								<div class="table-responsive" id="tblEstadisticas">
									<table class="table table-striped table-hover">
										<thead>
											<tr>
												<th>Clave</th>
												<th>Área</th>
												<th> </th>
												<th>Asignatura</th>
												<th>Prom B I</th>
												<th>Prom B II</th>
												<th>Prom B III</th>
												<th>Prom B IV</th>
												<th>Prom B V</th>
												<th>Prom Gral.</th>
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
				           			 	<legend align="center"><h4>Número de alumnos aprobados/reprobados: </h4></legend>
				           			 	<div>
											<table class="table table-striped table-hover">
												<thead>
													<tr>
														<th>- - - - - - - -</th>
														<th>- - - - - - - -</th>
														<th>- - - - - - - -</th>
														<th>Bimestre I </th>
														<th>Bimestre II </th>
														<th>Bimestre III </th>
														<th>Bimestre IV </th>
														<th>Bimestre V </th>
													</tr>
												</thead>
											</table>
									    </div>	
										<div  id="tblEstadistGrupo">
											<table class="table table-striped table-hover">
												<thead>
													<tr>
														<th>Clave</th>
														<th>Área</th>
														<th>Asignatura</th>
														<th>Apro</th>
														<th>Repr</th>
														<th>Apro</th>
														<th>Repr</th>
														<th>Apro</th>
														<th>Repr</th>
														<th>Apro</th>
														<th>Repr</th>
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
								<legend align="center"><h4>Alumnos con calificación de: </h4></legend>
									<div>
										<table class="table table-striped table-hover">
											<thead>
												<tr>
													<th>- - - - - - - -</th>
													<th>Bimestre I </th>
													<th>Bimestre II </th>
													<th>Bimestre III </th>
													<th>Bimestre IV </th>
													<th>Bimestre V </th>
												</tr>
											</thead>
										</table>
									</div>	
								<div id="tblEstadistAlu">
									<table class="table table-striped table-hover">
										<thead>
										<tr>
											<th>Asignatura</th>
											<th bgcolor="#ffffff">9-10</th>
										    <th bgcolor="#ffffff">8-9</th>
											<th bgcolor="#ffffff">7-8</th>
											<th bgcolor="#ffffff">6-7</th>
											<th bgcolor="#ffffff">5-6</th>

											<th>9-10</th>
										    <th>8-9</th>
											<th>7-8</th>
											<th>6-7</th>
											<th>5-6</th>

											<th bgcolor="#ffffff">9-10</th>
										    <th bgcolor="#ffffff">8-9</th>
											<th bgcolor="#ffffff">7-8</th>
											<th bgcolor="#ffffff">6-7</th>
											<th bgcolor="#ffffff">5-6</th>

											<th>9-10</th>
										    <th>8-9</th>
											<th>7-8</th>
											<th>6-7</th>
											<th>5-6</th>

											<th bgcolor="#ffffff">9-10</th>
										    <th bgcolor="#ffffff">8-9</th>
											<th bgcolor="#ffffff">7-8</th>
											<th bgcolor="#ffffff">6-7</th>
											<th bgcolor="#ffffff">5-6</th>
										</tr></thead>
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




<!-- Tabla estadisticas de una asignatura de acuerdo a un bimestre elegido-->
<div class="row hidden" id="pnlEstadisticasMateria">
	<div class="col-md-12">
		<div class="well">
			<div class="form-horizontal">
				<fieldset><legend id="legendTableMateria" class="center"></legend>
				 	<div class="col-md-12">
						<div  class= "well" class="form-horizontal">
							<div class="form-group">
								<label id="labelAsig"></label>
								<div class="table-responsive" id="tblEstadisticasMateria">
									<table class="table table-striped table-hover">
										<thead>
											<tr>
												<th>CURP Alumno</th>
												<th>Nombre Alumno</th>
												<th>Profesor</th>
												<th>Cal. B I</th>
												<th>Cal. B II</th>
												<th>Cal. B III</th>
												<th>Cal. B IV</th>
												<th>Cal. B V</th>
											</tr>
										</thead>
										<tbody id="tbodyEstadisticasMateria"></tbody>
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
{{ HTML::script('js/admin/estadisticas/ciclo.js') }}
<script>
	$('#collapseEst').addClass('in');
</script>
@stop