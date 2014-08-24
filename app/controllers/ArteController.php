<?php

class ArteController extends BaseController
{
	public function agregarArte(){
		if ( !Usuario::isAdmin())
			return Redirect::to('admin/logout');
		
		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar asignatura de arte */
		$insert = Arte::insert(array(
			'artNombre' => trim($data['nombreA'])
			));

		/* Mensajes en caso que la consulta halla tenido éxito o no */
		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'Arte agregada correctamente'
				);
		else 
			$response = array(
				'status' => 'Error',
				'message' => 'Intente nuevamente'
				);
		return Response::json($response);
			}
}