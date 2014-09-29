<?php
class EscuelaController extends \BaseController {

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

		$escuelas = Escuela::
			leftJoin('turnos', 'escuelas.escTurno', '=', 'turnos.turId')
			->orderBy('escNombre')
			->get()
			->toArray();
		return $escuelas;
	}


		/**************************************************************************/
	public function seleccionarEscuela(){
		if ( !Usuario::isAdmin() )
				return Redirect::to('admin/logout');

			$data = Input::all();

			$escuelas = Escuela::where('escId', $data['id'])
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

			$turnos = TurnoController::getTurnos();

			if ( count( $escuelas ) > 0 ){
				$datos = array(
					'escuelas' => $escuelas[0],
					'turnos' => $turnos
				);
				$response = array(
					'status' => 'OK',
					'data' => $datos,
					'message' => 'Resultados obtenidos'
				);
			}else
				$response = array(
					'status' => 'ERROR',
					'message' => 'No se encontraron resultados'
				);

			return Response::json($response);
	}
}
