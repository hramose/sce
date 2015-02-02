<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="cache-control" content="max-age=0" />
  <meta http-equiv="cache-control" content="no-cache" />
  <meta http-equiv="cache-control" content="no-store" />
  <meta http-equiv="cache-control" content="must-revalidate" />
  <meta http-equiv="expires" content="0" />
  <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
  <meta http-equiv="pragma" content="no-cache" />
  <link rel="shortcut icon" href="{{ URL::to('img/favicon.ico'); }}">
	<title>
		@section('title')
		@show
	</title>
	<!-- CSS -->
  {{ HTML::style('css/bootstrap.css') }}
  {{ HTML::style('css/layout.css') }}
  {{ HTML::style('css/pace.css') }}
  @section('css')
  @show

	<div class="navbar navbar-fixed-top">
	  <div class="navbar-header">
	    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
	      <span class="icon-bar"></span>
	      <span class="icon-bar"></span>
	      <span class="icon-bar"></span>
	    </button>
	  </div>
	  <div class="navbar-collapse collapse navbar-inverse-collapse">
	    <ul class="nav navbar-nav">
	      <li>{{ HTML::link('/admin', 'Sistema de Control Escolar') }}</li>
	    </ul>
	    <ul class="nav navbar-nav navbar-right">
    	  <li>{{ HTML::link('/admin', Session::get('nombre')) }}</li>
	      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span> <b class="caret"></b></a>
        <ul class="dropdown-menu">
          <li>{{ HTML::link('#', 'Cambiar contraseña', array('id' => 'linkPass', 'data-toggle' => 'modal', 'data-target' => '.pass')) }}</li>
          <li class="divider"></li>
          <li>{{ HTML::link('admin/logout', 'Cerrar sesión') }}</li>
        </ul>
	      </li>
	    </ul>
	  </div>
	</div>


</div>

	<div class="container-fluid">
  <div class="row">
    <div class="col-sm-3 col-md-2 sidebar" id="accordion">

      <!-- Alumnos -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseAlu">
                Alumnos
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseAlu" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
          <li id="liAgregarAlumno">
            <a href="{{ URL::to('admin/alumno/agregar') }}">
              <span class="glyphicon glyphicon-plus"></span> Agregar
            </a>
          </li>
          <li id="liEditarAlumno">
            <a href="{{ URL::to('admin/alumno/editar') }}">
              <span class="glyphicon glyphicon-edit"></span> Editar
            </a>
          </li>
          <li class="divisor"></li>
        </ul>
      </div>

      <!-- Asignaturas -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseAsig">
                Asignaturas
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseAsig" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
          <li id="liAgregarAsignatura">
          <a href="{{ URL::to('admin/asignatura/agregar')}}">
            <span class="glyphicon glyphicon-plus"></span>
            Agregar
          </a>
        </li>
        <li id="liEditarAsignatura">
          <a href="{{ URL::to('admin/asignatura/editar')}}">
            <span class="glyphicon glyphicon-edit"></span>
            Editar
          </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>

      <!-- Calificaciones -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseCal">
                Calificaciones
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseCal" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
          <li id="liAgregarCalificacion">
          <a href="{{ URL::to('admin/calificacion/agregar')}}">
            <span class="glyphicon glyphicon-plus"></span>
            Agregar
          </a>
        </li>
        <li id="liEditarCalificacion">
          <a href="{{ URL::to('admin/calificacion/editar')}}">
            <span class="glyphicon glyphicon-edit"></span>
            Editar
          </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>

      <!-- Ciclo -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseCiclo">
                Ciclo
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseCiclo" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
        <li id="liAgregarCiclo">
          <a href="{{ URL::to('admin/ciclo/agregar') }}">
              <span class="glyphicon glyphicon-plus"></span> Agregar
          </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>

      <!-- Escuela -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseEsc">
                Escuela
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseEsc" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
          <li id="liEditarEscuela">
          <a href="{{ URL::to('admin/escuela/editar')}}">
            <span class="glyphicon glyphicon-edit"></span>
            Editar
          </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>

     <!-- Estadísticas -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseEst">
                Estadísticas
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseEst" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
          <li id="liEstadisticasBimestre">
              <a href="{{ URL::to('admin/estadisticas/bimestre') }}">
              <span class="glyphicon glyphicon-chevron-right"></span> Bimestre
            </a>
          </li>
          <li id="liEstadisticasCiclo">
            <a href="{{ URL::to('admin/estadisticas/ciclo') }}">
              <span class="glyphicon glyphicon-chevron-right"></span> Ciclo
            </a>
          </li>
          <li class="divisor"></li>
        </ul>
      </div>


      <!-- Grupo -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseGrupo">
                Grupo
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseGrupo" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
        <li id="liAgregarGrupo">
          <a href="{{ URL::to('admin/grupo/agregar') }}">
            <span class="glyphicon glyphicon-plus"></span> Agregar - Editar
          </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>

      <!-- Listas -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseLista">
                Listas
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseLista" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
        <li id="liAgregarLista">
          <a href="{{ URL::to('admin/lista/agregar') }}">
            <span class="glyphicon glyphicon-plus"></span> Agregar
          </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>

      <!-- Profesores -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseProf">
                Profesor
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseProf" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
        <li id="liAgregarProfesor">
          <a href="{{ URL::to('admin/profesor/agregar') }}">
              <span class="glyphicon glyphicon-plus"></span> Agregar
            </a>
        </li>
        <li id="liEditarProfesor">
          <a href="{{ URL::to('admin/profesor/editar') }}">
              <span class="glyphicon glyphicon-edit"></span> Editar
            </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>


      <!-- Docentes Profesores Asignar -->
      <ul class="nav nav-sidebar">
        <li class="header">
          <h5>
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseDocentes">
              Docentes
            </a>
          </h5>
        </li>
      </ul>
      <div id="collapseDocentes" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
          <li id="liAsignarProfesor">
            <a href="{{ URL::to('admin/docente/asignarProfesor') }}">
              <span class="glyphicon glyphicon-plus"></span> Asignar Profesor
            </a>
          </li>
          <li class="divisor"></li>
        </ul>
      </div>

            <!-- Orientador -->
      <ul class="nav nav-sidebar">
        <li class="header">
         <h5>
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseOrie">
                Orientador
              </a>
          </h5>
        </li>
      </ul>
      <div id="collapseOrie" class="panel-collapse collapse">
        <ul class="nav nav-sidebar">
        <li id="liAsignarOrientador">
          <a href="{{ URL::to('admin/orientador/asignar') }}">
              <span class="glyphicon glyphicon-plus"></span> Asignar
            </a>
        </li>
        <li id="liEditarOrientador">
          <a href="{{ URL::to('admin/orientador/editar') }}">
              <span class="glyphicon glyphicon-edit"></span> Editar
            </a>
        </li>
        <li class="divisor"></li>
        </ul>
      </div>


  </div>
</div>

<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
@section('content')
@show
</div>

<div class="boxPoster">
	<div class="messagePoster"></div>
</div>
<input type="hidden" value="{{ URL::to('/') }}" id="baseUri">
{{ HTML::script('js/jquery.js') }}
{{ HTML::script('js/bootstrap.min.js') }}
{{ HTML::script('js/pace.min.js') }}
{{ HTML::script('js/layout.js') }}
@section('js')
@show
</body>
</html>
