<?php

class CalificacionController extends BaseController
{
  public function agregarCalificacion(){
    if( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    /* Datos recibidos por ajax */
    $data = Input::all();

    $duplicado = CalificacionController::duplicado($data['bimestre'],$data['identificador'],$data['asignatura']);
    if ( !$duplicado )
        return Response::json(array(
        'status' => 'ERROR',
        'message' => 'Ya existe una calificación asignada al alumno en ese bimestre y asignatura'
      ));

    $insert = Calificacion::insert(array(
      'calCalificacion' => trim($data['calificacion']),
      'calBimestre' => trim($data['bimestre']),
      'calIdentificador' => trim($data['identificador']),
      'calAsignatura' => trim($data['asignatura']),
      'calProfesor' => trim($data['profesor'])
      ));

    /* Mensajes en caso de que la consulta halla tenido exito o no */

    if ( $insert )
      $response = array(
        'status' => 'OK',
        'message' => 'Calificación se agrego exitosamente'
        );
    else
      $response = array(
        'status' => 'ERROR',
        'message' => 'Error al agregar la calificación, intente mas tarde'
        );

    return Response::json($response);
  }

    /*****************************************************************/
  public static final function duplicado( $bimestre, $identificador, $asignatura){

    $duplicado = Calificacion::where('calBimestre', $bimestre)
      ->where('calIdentificador', $identificador)
      ->where('calAsignatura', $asignatura)
      ->get()
      ->toArray();

    if ( count( $duplicado ) > 0 )
      return false;
    else
      return true;
  }

  /*public function buscarTurno(){
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();
    $buscar = trim($data['buscar']);

    $busqueda = Turno::where('turNombre', 'like', '%'. $buscar.'%')
    ->orWhere('turId', 'like','%'. $buscar .'%')
    ->get(array(
      'turId',
      'turNombre',
      'turEstado'
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
  }*/

/*  public function eliminarTurno(){
    if( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();

    // Actualizar turno
    $actualizar = Turno::where('turId', $data['id'])
    ->update(array(
      'turEstado' => false
      ));
    if ( $actualizar )
      $response = array(
        'status' => 'OK',
        'message' => 'turno eliminado'
        );
    else
      $response = array (
        'status' => 'ERROR',
        'message' => 'No se puede eliminar el turno, talvez no existe'
        );
    return Response::json( $response );
  }

  public static function getTurnos(){
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $turnos = Turno::where('turEstado', true)
      ->orderBy('turNombre')
      ->get()
      ->toArray();

    return $turnos;
  }*/

/*  public function seleccionarTurno() {
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

      $data = Input::all();

      $seleccionar = Turno::where('turId', $data['id'])
      ->get(array(
        'turId',
        'turNombre',
        'turEstado'
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
      }*/
}
