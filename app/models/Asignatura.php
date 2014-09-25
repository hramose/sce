<?php

class Asignatura extends Eloquent 
{
	protected $table = 'asignaturas';
	protected $primarykey = 'asigClave';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array(
		'asigClave',
		'asigNombre',
		'asigArea',
		'asigEstado'
		);
}