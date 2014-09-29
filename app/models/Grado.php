<?php
class Grado extends Eloquent
{
  protected $table = 'grados';
  protected $primaryKey = 'gradId';
  public $timestamps = false;
  public $incrementing = true;
  protected $fillable = array(
    'gradId'
  );
}