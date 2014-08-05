<?php

class CicloController extends BaseController
{
	public function agregarCiclo(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar ciclo*/
		$insert = Ciclo::insert(array(
			
			'cicCiclo' => trim($data['ciclo'])
			
			));

		/* Mensajes en caso de que la consulta
		halla tenido exito o no */

		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'Ciclo agregado correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo agregar el ciclo, intente de nuevo'
			);


		/* Se devuelve una respuesta en formato json */
		return Response::json( $response );
	}

	public function cancelarCiclo(){
		return Redirect::to('/inicio');
	}
}