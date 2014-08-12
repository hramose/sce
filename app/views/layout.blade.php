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
</head>

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
	      <li>{{ HTML::link('/', 'Sistema de Control Escolar') }}</li>
	    </ul>
	  </div>
	</div>

  @section('content')
  @show

<div class="boxPoster">
	<div class="messagePoster"></div>
</div>
<input type="hidden" value="{{ URL::to('/') }}" id="baseUri">
{{ HTML::script('js/jquery.js') }}
{{ HTML::script('js/bootstrap.min.js') }}
{{ HTML::script('js/pace.min.js') }}
@section('js')
@show
</body>
</html>