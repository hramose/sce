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
	Route::post('alumno/getEditarAlumno', array('uses' => 'AlumnoController@getEditarAlumno'));
	Route::post('alumno/editarAlumno', array('uses' => 'AlumnoController@editarAlumno'));

	/* Rutas para asignaturas */
	Route::get('asignatura/agregar', function(){
		return View::make('admin.asignatura.agregar');
	});
	Route::post('asignatura/agregarAsignatura', array('uses' => 'AsignaturaController@agregarAsignatura'));
	Route::get('asignatura/editar', function(){
		return View::make('admin.asignatura.editar');
	});
	Route::post('asignatura/buscarAsignatura', array('uses' => 'AsignaturaController@buscarAsignatura'));
	Route::post('asignatura/editarAsignatura', array('uses' => 'AsignaturaController@editarAsignatura'));
	Route::post('asignatura/eliminarAsignatura', array('uses' => 'AsignaturaController@eliminarAsignatura'));
	Route::post('asignatura/seleccionarAsignatura', array('uses' => 'AsignaturaController@seleccionarAsignatura'));
	Route::get('asignatura/getAsignaturas', array('uses'=> 'AsignaturaController@getAsignaturas'));

	/*Rutas calificacion*/
	Route::get('calificacion/agregar', function(){
		return View::make('admin.calificacion.agregar');
	});
	Route::post('calificacion/agregarCalificacion', array('uses' => 'CalificacionController@agregarCalificacion'));
	Route::get('calificacion/editar', function(){
		return View::make('admin.calificacion.editar');
	});
	Route::post('calificacion/buscarCalificacion', array('uses' => 'CalificacionController@buscarCalificacion'));
	Route::post('calificacion/getEditarCal', array('uses' => 'CalificacionController@getEditarCal'));
	Route::post('calificacion/editarCalificacion', array('uses' => 'CalificacionController@editarCalificacion'));

	/*Rutas para ciclo*/
	Route::get('ciclo/agregar', function(){
		return View::make('admin.ciclo.agregar');
	});
	Route::post('ciclo/agregarCiclo',array('uses' => 'CicloController@agregarCiclo'));
	Route::get('ciclo/getGrados',array('uses' => 'GradoController@getGrados'));
	Route::get('ciclo/getGrupos',array('uses' => 'GrupoController@getGrupos'));

	/* Rutas para escuelas */
	Route::get('escuela/getEscuelas', array('uses' => 'EscuelaController@getEscuelas'));
	Route::get('escuela/editar', function(){
		return View::make('admin.escuela.editar');
	});
	Route::post('escuela/buscarEscuela', array('uses' => 'EscuelaController@buscarEscuela'));
	Route::post('escuela/editarEscuela', array('uses' => 'EscuelaController@editarEscuela'));
	Route::post('escuela/eliminarEscuela', array('uses' => 'EscuelaController@eliminarEscuela'));
	Route::post('escuela/seleccionarEscuela', array('uses' => 'EscuelaController@seleccionarEscuela'));

	/*Rutas para Grupo*/
	Route::get('grupo/agregar', function(){
		return View::make('admin.grupo.agregar');
	});
	Route::get('grupo/editar', function(){
		return View::make('admin.grupo.editar');
	});
	Route::post('grupo/agregarGrupo',array('uses' => 'GrupoController@agregarGrupo'));
	Route::post('grupo/buscarGrupo', array('uses' => 'GrupoController@buscarGrupo'));
	Route::post('grupo/editarGrupo', array('uses' => 'GrupoController@editarGrupo'));
	Route::post('grupo/eliminarGrupo', array('uses' => 'GrupoController@eliminarGrupo'));
	Route::post('grupo/seleccionarGrupo', array('uses' => 'GrupoController@seleccionarGrupo'));

	/*Rutas para Grado*/
	Route::post('grado/seleccionarGrado', array('uses' => 'GradoController@seleccionarGrado'));

	/*Rutas para identificador*/
	Route::get('identificador/getIdentificadores', array('uses' => 'IdentificadorController@getIdentificadores'));

	/* Rutas listas */
	Route::get('lista/agregar', function(){
		return View::make('admin.lista.agregar');
	});

	/*Rutas para profesor*/
	Route::get('profesor/agregar', function () {
		return View::make('admin.profesor.agregar');
	});
	Route::post('profesor/agregarProfesor', array('uses' => 'ProfesorController@agregarProfesor'));
	Route::get('profesor/editar', function () {
		return View::make('admin.profesor.editar');
	});
	Route::post('profesor/buscarProfesor', array('uses' => 'ProfesorController@buscarProfesor'));
	Route::post('profesor/editarProfesor', array('uses' => 'ProfesorController@editarProfesor'));
	Route::post('profesor/eliminarProfesor', array('uses' => 'ProfesorController@eliminarProfesor'));
	Route::post('profesor/seleccionarProfesor', array('uses' => 'ProfesorController@seleccionarProfesor'));
	Route::get('profesor/getProfesores', array('uses' => 'ProfesorController@getProfesores'));

});
