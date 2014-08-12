<?php

class GrupoController extends BaseController{
  public function agregarGrupo(){
    if( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    /* Datos recibidos por ajax */
    $data = Input::all();

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


}
