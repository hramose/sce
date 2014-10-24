<?php

class CalificacionController extends BaseController
{
  public function agregarCalificacion(){
    if( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();

    $duplicado = CalificacionController::duplicado($data['bimestre'],$data['identificador'],$data['asignatura']);
    if ( !$duplicado )
        return Response::json(array(
        'status' => 'ERROR',
        'message' => 'Ya existe una calificación asignada al alumno con ese bimestre y asignatura'
      ));

    $insert = Calificacion::insert(array(
      'calCalificacion' => trim($data['calificacion']),
      'calBimestre' => trim($data['bimestre']),
      'calIdentificador' => trim($data['identificador']),
      'calAsignatura' => trim($data['asignatura']),
      'calProfesor' => trim($data['profesor'])
      ));

    /* Mensajes en caso de que la consulta halla tenido exito o no*/

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
  public function buscarCalificacion(){
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();
    $buscar = trim($data['buscar']);

    $busqueda = Identificador::
      leftJoin('alumnos', 'identificador.ideAlumno', '=', 'alumnos.aluCurp')
      ->leftJoin('ciclos', 'identificador.ideCiclo', '=', 'ciclos.cicId')
      ->leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')
      ->leftJoin('asignaturas', 'calificaciones.calAsignatura', '=', 'asignaturas.asigId')
      ->where('aluEstado', true)
      ->where('aluApem', 'like', '%'. $buscar .'%')
      ->orWhere('aluNombre', 'like', '%'. $buscar .'%')
      ->orWhere('aluCurp', 'like', '%'. $buscar .'%')
      ->orWhere('aluApep', 'like', '%'. $buscar .'%')
      ->orderBy('aluApep')
      ->orderBy('cicGrado')
      ->orderBy('calBimestre')
      ->get(array(
        'aluApep',
        'aluApem',
        'aluNombre',
        'asigNombre',
        'calBimestre',
        'calId',
        'cicCiclo',
        'cicGrado',
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
  /***********************************************************************/
public function editarCalificacion(){
  if ( !Usuario::isAdmin() )
    return Redirect::to('admin/logout');

  $data = Input::all();

  $update = Calificacion::where('calId', $data['id'])
    ->update(
      array(
        'calCalificacion' => trim($data['calificacion']),
        'calProfesor' => trim($data['profesor'])
      )
    );

    if ( $update )
      $response = array(
        'status' => 'OK',
        'message' => 'La calificación se editó correctamente'
      );
    else
      $response = array(
        'status' => 'ERROR',
        'message' => 'No se pudo editar la calificación, intente de nuevo. No se pueden guardar los mismos datos'
      );

  return Response::json( $response );
}
  /**********************************************************************/
  public function getEditarCal() {
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

      $data = Input::all();

      $calificacion = Calificacion::where('calId', $data['id'])
        ->leftJoin('asignaturas', 'calificaciones.calAsignatura', '=', 'asignaturas.asigId')
        ->leftJoin('identificador', 'calificaciones.calIdentificador', '=', 'identificador.ideId')
        ->leftJoin('alumnos', 'identificador.ideAlumno', '=', 'alumnos.aluCurp')
        ->get(array(
          'calCalificacion',
          'calBimestre',
          'calProfesor',
          'calIdentificador',
          'aluApep',
          'aluApem',
          'aluNombre',
          'asigId',
          'asigNombre',
        ))
        ->toArray();

      $profesores = Profesor::get(array('profCurp','profNombre'))
        ->toArray();

      $datos = array(
        'calificacion' => $calificacion[0],
        'profesores' => $profesores
      );

      if ( count( $calificacion ) > 0 )
        $response = array(
          'status' => 'OK',
          'data' => $datos,
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
