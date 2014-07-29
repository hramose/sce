<?php

class AsignaturaController extends BaseController
{
	public function agregarAsignatura(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Insertar asignatura */
		$insert = Asignatura::insert(array(
			'asigId' => trim($data['id']),
			'asigNombre' => trim($data['nombre']),
			'asigEstado' => trim($data['estado']),
			'asigpass' => hash::make(trim($data['id']))
			));

		/* Mensajes en caso de que la consulta
		halla tenido exito o no */

		if ( $insert )
			$response = array(
				'status' => 'Ok',
				'message' => 'Asignatura se agrego exitosamente'
				);
		else 
			$response = array(
				'status' => 'Error',
				'message' => 'Error al agregar la asigantura, intente mas tarde'
				);

		return Response::json($response);
	}

	public function buscarAsignatura(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Asignatura::where('asigNombre', 'like', '%'. $buscar.'%')
		->orWhere('asigId', 'like','%'. $buscar .'%')
		->get(array(
			'asigId',
			'asigNombre',
			'asigEstado'
			))
			->toArray();
		if( count( $busqueda)>0 )
			$response = array(
				'status' => 'Ok',
				'data' => $busqueda,
				'message' => 'Busqueda exitosa'
				);

		else
			$response = array(
				'status' => 'Error',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);
	}

	public function eliminarAsignatura(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar asignatura */
		$Actualizar = Asignatura::where('asigId', $data['id'])
		->update(array(
			'asigEstado' => false
			));
		if ( $actualizar )
			$response = array(
				'status' => 'Ok',
				'message' => 'Asignatura eliminada'
				);
		else
			$response = array (
				'status' => 'Error',
				'message' => 'No se puede eliminar la asignatura, talvez no existe'
				);
		return Response::json( $response );
	}
}