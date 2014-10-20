<?php
class IdentificadorController extends \BaseController {

  public static function getIdentificadores(){
    if ( !Usuario::isAdmin() )
      return Redirect::to('admin/logout');

    $identificadores = Identificador::
      leftJoin('alumnos', 'identificador.ideAlumno', '=', 'alumnos.aluCurp')
      ->leftJoin('ciclos', 'identificador.ideCiclo', '=', 'ciclos.cicId')
      ->where('aluEstado', true)
      ->orderBy('cicGrado')
      ->get()
      ->toArray();
    return $identificadores;
  }
}
