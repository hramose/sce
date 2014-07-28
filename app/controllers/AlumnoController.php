<?php

class AlumnoController extends BaseController
{
	public function agregarAlumno(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar alumno 
			La clase Hash sirve para encriptar, cuando se agrega un alumno
			su pass será su curp por default
			La función trim elimina espacios en blanco al inicio y al final de la cadena
		*/
		$insert = Alumno::insert(array(
			'aluCurp' => trim($data['curp']),
			'aluApep' => trim($data['apep']),
			'aluApem' => trim($data['apem']),
			'aluNombre' => trim($data['nombre']),
			'aluSexo' => $data['sexo'],
			'aluTutor' => trim($data['tutor']),
			'aluTelefono' => trim($data['telefono']),
			'aluDireccion' => trim($data['direccion']),
			'aluEdad' => trim($data['edad']),
			'aluObservaciones' => trim($data['observacion']),
			'aluEstado' => true,
			'aluPass' => Hash::make(trim($data['curp']))
		));

		/* Si se realizó la consulta devuelve un array con
			el elemento status, indicando si se realizo o no la consulta, y un mensaje
			describiendo que sucedio
		*/
		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'El alumno se agrego correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo agregar al alumno, intente de nuevo'
			);


		/* Se devuelve una respuesta en formato json */
		return Response::json( $response );
		
	}

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
		
		/* Actualizar estado del alumno */
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
	}
}