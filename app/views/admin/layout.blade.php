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

	<div class="container-fluid">
  <div class="row">
    <div class="col-sm-3 col-md-2 sidebar">
      <ul class="nav nav-sidebar">
        <li class="header">
        	<h5>Alumnos</h5>
        </li>
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
      <ul class="nav nav-sidebar">
      	<li class="header">
      		<h5>Profesores</h5>
        </li>
    		<li>
    			<a href="#">Agregar</a>
    		</li>
    		<li>
    			<a href="#">Editar</a>
    		</li>
        <li class="divisor"></li>
      </ul>
      <ul class="nav nav-sidebar">
        <li class="header">
          <h5>Escuela</h5>
        </li>
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