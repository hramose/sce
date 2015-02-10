<?php

class AsignaturaController extends BaseController
{
	public function agregarAsignatura(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Duplicado */
		$duplicado = Asignatura::where('asigClave', $data['clave'])
			->where('asigNombre', $data['nombre'])
			->where('asigArea', $data['area'])
			->get()
			->toArray();

		if ( count( $duplicado ) > 0 )
			return Response::json(array(
					'status' => 'ERROR',
					'message' => 'Ya existe una asignatura igual, verifiquelo'
				));

		/* Insertar asignatura */
		$insert = Asignatura::insert(array(
			'asigClave' => trim($data['clave']),
			'asigNombre' => trim($data['nombre']),
			'asigIdNom' => trim($data['idNombre']),
			'asigArea' => trim($data['area']),
			'asigEstado' => true
			));


		/* Mensajes en caso de que la consulta halla tenido exito o no */

		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'La asignatura se agregó exitosamente'
				);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'Error al agregar la asigantura, intente mas tarde'
				);

		return Response::json($response);
	}

	public function buscarAsignatura(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$buscar = trim($data['buscar']);

		$busqueda = Asignatura::where('asigArea', 'like', '%'. $buscar.'%')
		->orWhere('asigNombre', 'like','%'. $buscar .'%')
		->orderBy('asigArea')
		->orderBy('asigNombre')
		->get(array(
			'asigId',
			'asigClave',
			'asigNombre',
			'asigArea',
			'asigEstado'
			))
			->toArray();

		if( count( $busqueda)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $busqueda,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);
	}

	public function editarAsignatura(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar datos de asignatura */
		$editar = Asignatura::where('asigId', $data['id'])
		->update(array(
			'asigClave' => trim($data['clave']),
			'asigNombre' => trim($data['nombre']),
			'asigIdNom' => trim($data['idNombre']),
			'asigArea' =>trim($data['area']),
			'asigEstado' => trim($data['estado'])
			));
		if ( $editar )
			$response = array(
				'status' => 'OK',
				'message' => 'La asignatura se actualizó correctamente'
				);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se pudo actualizar la asignatura, intente nuevamente.
								Los datos deben ser distintos para realizar la actualización'
				);
		return Response::json( $response );
	}

	public function eliminarAsignatura(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();

		/* Actualizar asignatura */
		$actualizar = Asignatura::where('asigId', $data['id'])
		->update(array(
			'asigEstado' => false
			));
		if ( $actualizar )
			$response = array(
				'status' => 'OK',
				'message' => 'La asignatura se eliminó correctamente'
				);
		else
			$response = array (
				'status' => 'ERROR',
				'message' => 'No se puede eliminar la asignatura, tal vez no existe o ya está inactiva'
				);
		return Response::json( $response );
	}

	public static function getAsignaturas(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$asignaturas = Asignatura::where('asigEstado', true)
			->orderBy('asigNombre')
			->get()
			->toArray();

		return $asignaturas;
	}

	public function seleccionarAsignatura() {
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

			$data = Input::all();

			$seleccionar = Asignatura::where('asigId', $data['id'])
			->get(array(
				'asigId',
				'asigClave',
				'asigNombre',
				'asigArea',
				'asigEstado'
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
