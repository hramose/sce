<?php
class Grupo extends Eloquent
{
  protected $table = 'grupos';
  protected $primaryKey = 'grupId';
  public $timestamps = false;
  public $incrementing = true;
  protected $fillable = array(
    'grupId',
    'grupNombre',
    'grupEstado'
  );
}
