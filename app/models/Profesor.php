<?php

class Profesor extends Eloquent
{
	protected $table = 'profesores';
	protected $primaryKey = 'profCurp';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array(
		'profCurp',
		'profNombre',
		'profPerfil',
		'profTelefono',
		'profDireccion',
		'profEstado',
		'profOrientador',
		'profPass'
	);
}