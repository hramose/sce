<?php

class Escuela extends Eloquent
{
	protected $table = 'escuelas';
	protected $primaryKey = 'escId';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array(
		'escId',
		'escNombre',
		'escZona',
		'escDireccion',
		'escTelefono',
		'escDirector',
		'escEstado',
		'escTurno'		
	);
}