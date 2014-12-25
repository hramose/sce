<?php
class IdentificadorController extends \BaseController {

  public function getAlumnosGrupo(){
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $data = Input::all();
    $identificadores = Identificador::
      leftJoin('alumnos', 'identificador.ideAlumno', '=', 'alumnos.aluCurp')
      ->leftJoin('ciclos', 'identificador.ideCiclo', '=', 'ciclos.cicId')
        ->where('cicGrupo', $data['grupo'])
        ->where('cicCiclo', $data['ciclo'])
        ->where('cicGrado', $data['grado'])
        ->where('aluEstado', true)
        ->orderBy('aluApep')
        ->get(array(
          'ideId',
          'aluApep',
          'aluApem',
          'aluNombre',
          'cicId'
      ))
      ->toArray();
    return $identificadores;
  }
}
