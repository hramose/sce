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

  /************************************GetGrados******************************************/
  public static function getGrados(){
  if( !Usuario::isAdmin() )
        return Redirect::to('admin/logout');

  $grados = Grado::get(array(
        'gradId'
      ))
      ->toArray();
    return $grados;
  }

}
