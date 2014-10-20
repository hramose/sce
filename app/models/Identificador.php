<?php
  class Identificador extends Eloquent{
    protected $table = 'identificador';
    protected $primaryKey = 'ideId';
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = array(
      'ideId',
      'ideObservacion',
      'ideAlumno',
      'ideCiclo'
    );
  }
