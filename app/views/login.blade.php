@extends('layout')

@section('title')
Sistema de Control Escolar
@stop

@section('content')
<div class="container">
  {{ Form::open(array('url' => '/login', 'method' => 'post', 'class' => 'form-signin')); }}
  <h2 class="form-signin-heading">Ingresar</h2>
  <div id="message"></div>
  {{ Form::text('usuario', null, 
        array('placeholder' => 'Usuario', 'class' => 'form-control', 'maxlength' => '10', 'required', 'autofocus')); }}
  {{ Form::password('pass', 
        array('placeholder' => 'Contraseña', 'class' => 'form-control', 'required')); }}
  {{ Form::select('tipo', array('0' => 'Alumno', '1' => 'Académico', '2' => 'Administrador'), null, array('class' => 'form-control')); }}
  {{ Form::submit('Entrar', array('class' => 'btn btn-info btn-block')); }}

{{ Form::close(); }}

</div>
@stop