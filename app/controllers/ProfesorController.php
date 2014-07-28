<?php

class ProfesorController extends \BaseController {
public function agregarProfesor(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar profesor 
			La clase Hash sirve para encriptar, cuando se agrega un alumno
			su pass será su curp por default
			La función trim elimina espacios en blanco al inicio y al final de la cadena
		*/
		$insert = Profesor::insert(array(
			'profCurp' => trim($data['curp']),
			'profNombre' => trim($data['nombre']),
			'profPerfil' => $data['perfil'],
			'profTelefono' => trim($data['telefono']),
			'profDireccion' => trim($data['direccion']),
			'profEstado' => true,
			'profOrientador' => trim($data['orientador']),
			'profPass' => Hash::make(trim($data['curp']))
		));

		/* Si se realizó la consulta devuelve un array con
			el elemento status, indicando si se realizo o no la consulta, y un mensaje
			describiendo que sucedio
		*/
		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'El profesor se agrego correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo agregar al profesor, intente de nuevo'
			);


		/* Se devuelve una respuesta en formato json */
		return Response::json( $response );
		
	}
/*
	public function buscarAlumno(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Alumno::where('aluApep', 'like', '%'. $buscar .'%')
			->orWhere('aluApem', 'like', '%'. $buscar .'%')
			->orWhere('aluNombre', 'like', '%'. $buscar .'%')
			->orWhere('aluCurp', 'like', '%'. $buscar .'%')
			->get(array(
				'aluCurp',
				'aluApep',
				'aluApem',
				'aluNombre',
				'aluTutor',
				'aluTelefono',
				'aluEstado'
			))
			->toArray();

		if ( count( $busqueda ) > 0 )
			$response = array(
				'status' => 'OK',
				'data' => $busqueda,
				'message' => 'Resultados obtenidos'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
			);

		return Response::json( $response );
	}

	public function eliminarAlumno(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		
		/* Actualizar estado del alumno 
		$actualizar = Alumno::where('aluCurp', $data['id'])
			->update(array(
				'aluEstado' => false
			));

		if ( $actualizar )
			$response = array(
				'status' => 'OK',
				'message' => 'El alumno se eliminó correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo eliminar al alumno, tal vez ya se encuentra inactivo'
			);

		return Response::json( $response );
	}*/
}