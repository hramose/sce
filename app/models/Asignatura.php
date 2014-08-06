<?php

class Asignatura extends Eloquent 
{
	protected $table = 'asignaturas';
	protected $primarykey = 'asigId';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array(
		'asigId',
		'asigNombre',
		'asigEstado'
		);
}