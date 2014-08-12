<?php
class Grupo extends Eloquent
{
  protected $table = 'grupo';
  protected $primaryKey = 'grupId';
  public $timestamps = false;
  public $incrementing = false;
  protected $fillable = array(
    'grupId',
    'grupNombre',
    'grupEstado'
  );
}
