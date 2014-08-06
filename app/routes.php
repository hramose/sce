<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	Session::flush();
	Cache::flush();
	return View::make('login', array('cache-control' => 'no-cache, max-age=0, must-revalidate, no-store'));
});
Route::post('/login', array('uses' => 'UsuarioController@login'));


/* Rutas solo para administrador */
Route::group(array('prefix' => 'admin', 'before' => 'admin'), function()
{
	Route::get('/', function(){
		return View::make('admin.inicio');
	});
	Route::get('logout', array('uses' => 'UsuarioController@logout'));


	/* Rutas para alumnos */
	Route::get('alumno/agregar', function(){
		return View::make('admin.alumno.agregar');
	});
	Route::post('alumno/agregarAlumno', array('uses' => 'AlumnoController@agregarAlumno'));
	Route::get('alumno/editar', function(){
		return View::make('admin.alumno.editar');
	});
	Route::post('alumno/buscarAlumno', array('uses' => 'AlumnoController@buscarAlumno'));
	Route::post('alumno/eliminarAlumno', array('uses' => 'AlumnoController@eliminarAlumno'));

	/* Rutas para asignaturas */
	Route::get('asignatura/agregarAsignatura', function(){
		return View::make('admin.asignatura.agregarAsignatura');
	});
	Route::post('asignatura/agregarAsignatura', array('uses' => 'AsignaturaController@agregarAsignatura'));
	Route::get('asignatura/editarAsignatura', function(){
		return View::make('admin.asignatura.editarAsignatura');
	});	

	/* Rutas para escuelas */
	Route::get('escuela/editarEscuela', function(){
		return View::make('admin.escuela.editarEscuela');
	});
	Route::post('escuela/buscarEscuela', array('uses' => 'EscuelaController@buscarEscuela'));
	Route::post('escuela/eliminarEscuela', array('uses' => 'EscuelaController@eliminarEscuela'));

	/*Rutas para profesor*/
	Route::get('profesor/agregar', function () {
		return View::make('admin.profesor.agregar');
	});
	Route::post('profesor/agregarProfesor', array('uses' => 'ProfesorController@agregarProfesor'));
	Route::get('profesor/editar', function () {
		return View::make('admin.profesor.editar');
	});
	
	Route::post('profesor/buscarProfesor', array('uses' => 'ProfesorController@buscarProfesor'));
	Route::post('profesor/eliminarProfesor', array('uses' => 'ProfesorController@eliminarProfesor'));
	Route::post('profesor/seleccionarProfesor', array('uses' => 'ProfesorController@seleccionarProfesor'));

	/* Rutas para turnos */
	Route::get('turno/agregarTurno', function (){
		return View::make('admin.turno.agregarTurno');
	});
	Route::post('turno/agregarTurno', array('uses' => 'TurnoController@agregarTurno'));	
	Route::get('turno/editarTurno', function(){
		return View::make('admin.turno.editarTurno');
	});
	Route::post('turno/buscarTurno', array('uses' => 'TurnoController@buscarTurno'));
	Route::post('turno/eliminarTurno', array('uses' => 'TurnoController@eliminarTurno'));
	Route::post('turno/seleccionarTurno', array('uses' => 'TurnoController@seleccionarTurno'));
	
	/* Rutas para Tecologias */
	Route::post('tecnologia/agregarTecnologia', array('uses' => 'TecnologiaController@agregarTecnologia'));	 

	/*Rutas para ciclo*/
	Route::get('ciclo/agregar', function(){
		return View::make('admin.ciclo.agregar');
	});
	Route::post('ciclo/agregarCiclo',array('uses' => 'CicloController@agregarCiclo'));

});

