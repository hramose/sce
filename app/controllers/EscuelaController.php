<?php
class EscuelaController extends \BaseController {

	public function buscarEscuela(){
			/*Si no se autentifica como administrador */
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Escuela::get(array(
				'escId',
				'escNombre',
				'escTelefono',
				'escEstado',
				'escTurno'
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

		/**************************************************************************/
	public function editarEscuela(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		$editar = Escuela::where('escId', $data['id'])
		->update(array(
			'escId' => trim($data['ct']),
			'escNombre' => trim($data['nombre']),
			'escZona' => trim($data['zona']),
			'escDireccion' => trim($data['direccion']),
			'escTelefono' => trim($data['telefono']),
			'escDirector' => trim($data['director']),
			'escEstado' => $data['estado'],
			'escTurno' => $data['turno']
			));
		if ( $editar )
			$response = array(
				'status' => 'OK',
				'message' => 'Escuela actualizada'
				);
		else
			$response = array (
				'status' => 'ERROR',
				'message' => 'No se puede actualizar la escuela, intente otra vez'
				);
		return Response::json( $response );
	}

		/**************************************************************************/
	public function eliminarEscuela(){
			if( !Usuario::isAdmin() )
				return Redirect::to('admin/logout');

			$data = Input::all();

			$actualizar = Escuela::where('escId', $data['id'])
			->update(array(
				'escEstado' => false
				));
			if ( $actualizar )
				$response = array(
					'status' => 'OK',
					'message' => 'Escuela eliminada'
					);
			else
				$response = array (
					'status' => 'ERROR',
					'message' => 'No se puede eliminar la escuela, talvez ya fue eliminada'
					);
			return Response::json( $response );
		}

	/* Método estatico para obtener las escuelas */
	public static function getEscuelas(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$escuelas = Escuela::orderBy('escNombre')->get()->toArray();

		return $escuelas;
	}


		/**************************************************************************/
	public function seleccionarEscuela(){
		if ( !Usuario::isAdmin() )
				return Redirect::to('admin/logout');

			$data = Input::all();

			$seleccionar = Escuela::where('escId', $data['id'])
			->get(array(
				'escId',
				'escNombre',
				'escZona',
				'escDireccion',
				'escTelefono',
				'escDirector',
				'escEstado',
				'escTurno'
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

			return Response::json($response);
	}
}
