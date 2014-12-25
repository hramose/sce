<?php
class Docente extends Eloquent
{
  protected $table = 'docentes';
  protected $primaryKey = 'docId';
  public $timestamps = false;
  public $incrementing = true;
  protected $fillable = array(
    'docId',
    'docCiclo',
    'docProfesor',
    'docAsignatura'
  );
}
