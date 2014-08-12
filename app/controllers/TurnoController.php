<?php

class TurnoController extends BaseController
{
	public function agregarTurno(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar turno */
		$insert = Turno::insert(array(
			'turId' => trim($data['id']),
			'turNombre' => trim($data['nombre']),
			'turEstado' => true
			));

		/* Mensajes en caso de que la consulta halla tenido exito o no */

		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'Turno se agrego exitosamente'
				);
		else 
			$response = array(
				'status' => 'ERROR',
				'message' => 'Error al agregar el turno, intente mas tarde'
				);

		return Response::json($response);
	}
	public function buscarTurno(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Turno::where('turNombre', 'like', '%'. $buscar.'%')
		->orWhere('turId', 'like','%'. $buscar .'%')
		->get(array(
			'turId',
			'turNombre',
			'turEstado'
			))
			->toArray();
		if( count( $busqueda)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $busqueda,
				'message' => 'Busqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);
	}

	public function eliminarTurno(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar turno */
		$actualizar = Turno::where('turId', $data['id'])
		->update(array(
			'turEstado' => false
			));
		if ( $actualizar )
			$response = array(
				'status' => 'OK',
				'message' => 'turno eliminado'
				);
		else
			$response = array (
				'status' => 'ERROR',
				'message' => 'No se puede eliminar el turno, talvez no existe'
				);
		return Response::json( $response );
	}

	public function seleccionarTurno() {
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

			$data = Input::all();

			$seleccionar = Turno::where('turId', $data['id'])
			->get(array(
				'turId',
				'turNombre',
				'turEstado'
				))
				->toArray();

				if ( count( $seleccionar ) > 0 )
				$response = array(					
					'status' => 'OK',
					'data' => $seleccionar,			
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