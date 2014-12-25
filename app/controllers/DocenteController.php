<?php

class DocenteController extends BaseController{

  /*************************************************************/
  public function asignarProfAsignatura(){
    if( !Usuario::isAdmin() )
    return Redirect::to('admin/logout');

    $data = Input::all();

    $duplicado = Docente::where('docCiclo', $data['ciclo'])
    ->where('docProfesor', $data['profesor'])
    ->where('docAsignatura', $data['asignatura'])
    ->get()
    ->toArray();

    if ( count( $duplicado ) > 0 )
    return Response::json(array(
      'status' => 'Error',
      'message' => 'Ya existe un profesor con asignatura asignado a este ciclo, verifique'
    ));

    $insert = Docente::insert(array(
      'docCiclo' => $data['ciclo'],
      'docProfesor' => $data['profesor'],
      'docAsignatura' => $data['asignatura']
    ));

    if ( $insert )
    $response = array(
      'status' => 'OK',
      'message' => 'Profesor asignado correctamente'
    );
    else
    $response = array(
      'status' => 'ERROR',
      'message' => 'No se pudo asignar al profesor, intente de nuevo'
    );
    /* Se devuelve una respuesta en formato json */
    return Response::json( $response );
  }

  /***************************************************************************/
  public static function getIdDocente(){
    if ( !Usuario::isAdmin() )
    return Redirect::to('admin/logout');

    $data = Input::all();

    $idDocentes = Docente::
    where('docCiclo', $data['ciclosId'])
    ->where('docAsignatura', $data['asignatura'])
    ->where('docProfesor', $data['profesor'])
    ->get(array(			/*datos necesarios por ahora para mostrar en un select*/
      'docId'
    ))
    ->toArray();

    return $idDocentes;
  }

}
