<?php

class GrupoController extends BaseController{

  public function agregarGrupo(){
    if( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    /* Datos recibidos por ajax */
    $data = Input::all();

    $duplicado = GrupoController::duplicado($data['grupo']);
    if ( !$duplicado )
        return Response::json(array(
        'status' => 'ERROR',
        'message' => 'Ya existe un grupo igual, verificalo'
      ));

    /* Insertar grupo*/
    $insert = Grupo::insert(array(
      'grupNombre' => trim($data['grupo']),
      'grupEstado' => true
      ));

    /* Mensajes en caso de que la consulta
    halla tenido exito o no */

    if ( $insert )
      $response = array(
        'status' => 'OK',
        'message' => 'Grupo agregado correctamente'
      );
    else
      $response = array(
        'status' => 'ERROR',
        'message' => 'No se pudo agregar el nombre del grupo, intente de nuevo'
      );

    /* Se devuelve una respuesta en formato json */
    return Response::json( $response );
  }

  public function buscarGrupo(){
      /*Si no se autentifica como administrador */
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();
    $buscar = trim($data['buscar']);

    $busqueda = Grupo::orderBy('grupNombre', 'asc')
      ->get(array(
        'grupId',
        'grupNombre',
        'grupEstado'
      ))
      ->toArray();

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

  /*************************************************************/
  public static final function duplicado( $grupo){

    $duplicado = Grupo::where('grupNombre', $grupo)
      ->get()
      ->toArray();

    if ( count( $duplicado ) > 0 )
      return false;
    else
      return true;
  }

  public function editarGrupo(){
    if( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();

    $editar = Grupo::where('grupId', $data['id'])
      ->update(array(
        'grupEstado' => $data['estado']
      ));

    if ( $editar )
      $response = array(
        'status' => 'OK',
        'message' => 'Grupo actualizado'
        );
    else
      $response = array (
        'status' => 'ERROR',
        'message' => 'No se puede actualizar el grupo, intente otra vez'
        );
    return Response::json( $response );
  }

    /**************************************************************************/
  public function eliminarGrupo(){
      if( !Usuario::isAdmin() )
        return Redirect::to('admin/logout');

      $data = Input::all();

      $actualizar = Grupo::where('grupId', $data['id'])
      ->update(array(
        'grupEstado' => false
        ));
      if ( $actualizar )
        $response = array(
          'status' => 'OK',
          'message' => 'Grupo eliminado'
          );
      else
        $response = array (
          'status' => 'ERROR',
          'message' => 'No se puede eliminar el grupo, talvez ya fue eliminado'
          );
      return Response::json( $response );
    }


    /**************************************************************************/
  public function seleccionarGrupo(){
    if ( !Usuario::isAdmin() )
        return Redirect::to('admin/logout');

      $data = Input::all();

      $seleccionar = Grupo::where('grupId', $data['id'])
      ->get(array(
        'grupId',
        'grupNombre',
        'grupEstado'
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

      return Response::json($response);
  }

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

}
