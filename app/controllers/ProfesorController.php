<?php

class ProfesorController extends \BaseController {
public function agregarProfesor(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar profesor
			La clase Hash sirve para encriptar, cuando se agrega
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
		/**************************************************************************/
	public function buscarProfesor(){
			/*Si no se autentifica como administrador */
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Profesor::where('profNombre', 'like', '%'. $buscar .'%')
			->orWhere('profCurp', 'like', '%'. $buscar .'%')
			->get(array(
				'profCurp',
				'profNombre',
				'profPerfil',
				'profTelefono',
				'profEstado'
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

		/********************************************************/
	public function editarProfesor(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar datos del profesor*/
		$editar = Profesor::where('profCurp', $data['id'])
			->update(array(
				'profCurp' => trim($data['curp']),
				'profNombre' => trim($data['nombre']),
				'profPerfil' => $data['perfil'],
				'profTelefono' => trim($data['telefono']),
				'profDireccion' => trim($data['direccion']),
				'profOrientador' => trim($data['orientador']),
				'profEstado' => trim($data['estado']),
				'profPass' => Hash::make(trim($data['curp']))
			));

		if ( $editar )
			$response = array(
				'status' => 'OK',
				'message' => 'El profesor se actualizo correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo actualizar el profesor, intente de nuevo'
			);
		/* Se devuelve una respuesta en formato json */
		return Response::json( $response );
	}
		/**************************************************************************/
	public function eliminarProfesor(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar estado del profesor*/
		$actualizar = Profesor::where('profCurp', $data['id'])
			->update(array(
				'profEstado' => false
			));

		if ( $actualizar )
			$response = array(
				'status' => 'OK',
				'message' => 'El profesor se eliminó correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo eliminar al profesor, tal vez ya se encuentra inactivo'
			);

		return Response::json( $response );
	}
	/*******************************************************************/
	public static function getProfesores(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$profesores = Profesor::where('profEstado', true)
			->orderBy('profNombre')
			->get(array(			/*datos necesarios por ahora para mostrar en un select*/
				'profCurp',
				'profNombre',
				'profPerfil',
			))
			->toArray();
		return $profesores;
	}


	/*******************************************************************/
	public function seleccionarProfesor() {
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

			$data = Input::all();

			$seleccionar = Profesor::where('profCurp', $data['id'])
			->get(array(
				'profCurp',
				'profNombre',
				'profPerfil',
				'profTelefono',
				'profDireccion',
				'profEstado',
				'profOrientador'
				))
				->toArray();

				if ( count( $seleccionar ) > 0 )
				$response = array(					/*response regresa parametros al js*/
					'status' => 'OK',
					'data' => $seleccionar,			/*datos de la consulta*/
					'message' => 'Resultados obtenidos'
				);
				else
				$response = array(
					'status' => 'ERROR',
					'message' => 'No se encontraron resultados'
				);

				return Response::json( $response );
			}
}
