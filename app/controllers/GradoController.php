  <?php

class GradoController extends BaseController{

  /**************************************************************************/
  public function seleccionarGrado(){
    if ( !Usuario::isAdmin() )
        return Redirect::to('admin/logout');

      $data = Input::all();

      $seleccionar = Grado::where('gradId','>', 0)
      ->get(array(
        'gradId'
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
    /*****************************************Selecciona grados************/
  public function gradosActivos(){
    if ( !Usuario::isAdmin() )
        return Redirect::to('admin/logout');

    $data = Input::all();

    $seleccionarActivos = Grado::where('gradId','>', 0)  //select gradId from grados where sea mayor que cero;
      ->get(array(
        'gradId'
      ))
      ->toArray();

    if(count($seleccionarActivos) > 0)
      $response = array(
        'status' => 'OK',
        'data' => $seleccionarActivos,
        'message' => 'Correcto'
      );
    else
      $response = array(
        'status' => 'ERROR',
        'message' => 'No se encontraron Grados'
      );
    return Response::json($response);
  }
}