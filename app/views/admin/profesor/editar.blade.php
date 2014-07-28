@extends('admin.layout')

@section('title')
Editar Profesor | Sistema de Control Escolar
@stop

@section('content')
<h1 class="page-header" id="page-header">
	<span class="glyphicon glyphicon-edit"></span> Editar profesor
</h1>

@stop

@section('js')
{{ HTML::script('js/admin/alumno/editar.js') }}
@stop