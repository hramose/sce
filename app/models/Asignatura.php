<?php

class Asignatura extends Eloquent 
{
	protected $table = 'asignaturas';
	protected $primarykey = 'asigId';
	public $timestamps = false;
	public $incrementing = true;
	protected $fillable = array(
		'asigId',
		'asigClave',
		'asigNombre',
		'asigArea',
		'asigEstado'
		);
}