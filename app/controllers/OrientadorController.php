<?php

class OrientadorController extends BaseController{
/************************************GetGrupos******************************************/
  public static function getGrupos(){
  if( !Usuario::isAdmin() )
        return Redirect::to('admin/logout');

  $grupos = Grupo::where('grupEstado',1)  //select grupId, grupNombre from grupos where grupEstado = 1;
        ->orderBy('grupNombre')
        ->get()
        ->toArray();
    return $grupos;
  }

		/**************************************************************************/
	public function buscarProfesor(){
			/*Si no se autentifica como administrador */
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

  $busqueda = Profesor::where('profEstado',1)
  			->where('profOrientador',1)
			->get(array(
				'profCurp',
				'profNombre'
			))
			->toArray();
		return $busqueda;

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
/************************************GetCiclos******************************************/
	public static function getCiclos(){
	if( !Usuario::isAdmin() )
				return Redirect::to('admin/logout');

	$ciclos = Ciclo::groupBy('cicCiclo')
			->get()
			->toArray();
		return $ciclos;
	}
/******************************actualizar ciclos******************/
 	public function asignar(){
		if( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		/* Datos recibidos por ajax */
		$data = Input::all();

		/* Buscar duplicado */
		$duplicado = Ciclo::where('cicCiclo', $data['ciclos'])
			->where('cicGrado', $data['grado'])
			->where('cicGrupo', $data['grupo'])
			->where('cicOrientador', $data['profesor'])
			->get()
			->toArray();

		if ( count( $duplicado ) > 0 )
			return Response::json(array(
					'status' => 'Error',
					'message' => 'El Orientador ya fue asignado a ese grupo y grado, verificalo'
				));

		/* Insertar ciclo*/
		$insert = Ciclo::where('cicCiclo', $data['ciclos'])
			->where('cicGrado', $data['grado'])
			->where('cicGrupo', $data['grupo'])
		->update(array(
			'cicCiclo' => trim($data['ciclos']),
			'cicGrupo' => trim($data['grupo']),	/*para agregar relacion entre tabla ciclo y grupo*/
			'cicGrado' => trim($data['grado']),	/*para agregar relacion entre tabla ciclo y grupo*/
			'cicOrientador' => trim($data['profesor'])
			));

		/* Mensajes en caso de que la consulta
		halla tenido exito o no */

		if ( $insert )
			$response = array(
				'status' => 'OK',
				'message' => 'Orientador Asignado correctamente'
			);
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se puede Asignar al orientador, intente de nuevo'
			);

		/* Se devuelve una respuesta en formato json */
		return Response::json( $response );
	}

}