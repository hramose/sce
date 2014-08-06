<?php

class EscuelaController extends BaseController
{
	public function agregarEscuela(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar escuela */
		$insert = Escuela::insert(array(
			'escId' => trim($data['id']),
			'escNombre' => trim($data['nombre']),
			'escZona' => trim($data['zona']),
			'escDireccion' => trim($data['direccion']),
			'escTelefono' => trim($data['telefono']),
			'escDirector' => trim($data['director']),
			'escEstado' => true
			));

		/* Mensajes en caso de que la consulta halla tenido exito o no */

		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'La escuela se agrego exitosamente'
				);
		else 
			$response = array(
				'status' => 'ERROR',
				'message' => 'Error al agregar la escuela, intente mas tarde'
				);

		return Response::json($response);
	}

	public function buscarEscuela(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Escuela::where('escZona', 'like', '%'. $buscar.'%')
		->orWhere('escNombre', 'like','%'. $buscar .'%')
		->orWhere('escId', 'like', '%'. $buscar .'%')
		->get(array(
			'escId',
			'escNombre',
			'escZona',
			'escTelefono',
			'escEstado'
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

	public function eliminarEscuela(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar escuela */
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
				'message' => 'No se puede eliminar la escuela, talvez no existe'
				);
		return Response::json( $response );
	}
}