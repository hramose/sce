<?php

class CicloController extends BaseController
{
	public function agregarCiclo(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar asignatura */
		$insert = Ciclo::insert(array(
			//'cicId' => 1,
			'cicCiclo' => trim($data['ciclo'])
			
			));

		/* Mensajes en caso de que la consulta
		halla tenido exito o no */

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
}