<?php

class TecnologiaController extends Eloquent
{
	public function agregarTecnologia(){
		if ( !Usuario::isAdmin())
			return Redirect::to('admin/logout');
		
		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar asignatura de tecnología */
		$insert = Tecnologia::insert(array(
			'tecNombre' => trim($data['nombre'])
			));

		/* Mensajes en caso que la consulta halla tenido éxito o no */
		if ( $insert )
			$response = array(
				'status' => 'Ok',
				'message' => 'Tecnologia agregada correctamente'
				);
		else 
			$response = array(
				'status' => 'Error',
				'message' => 'Intente nuevamente'
				);
		return Response::json('response');
			}
}