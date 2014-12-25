<?php
class Calificacion extends Eloquent{
  protected $table = 'calificaciones';
  protected $primarykey = 'calId';
  public $timestamps = false;
  public $incrementing = true;
  protected $fillable = array(
    'calId',
    'calCalificacion',
    'calBimestre',
    'calAutorizado',
    'calIdentificador',
    'calDocente'
    );
}
