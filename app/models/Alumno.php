<?php

class Alumno extends Eloquent
{
	protected $table = 'alumnos';
	protected $primaryKey = 'admCurp';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array(
		'aluCurp',
		'aluApep',
		'aluAepm',
		'aluNombre',
		'aluSexo',
		'aluTutor',
		'aluTelefono',
		'aluDireccion',
		'aluEdad',
		'aluObservaciones',
		'aluEstado',
		'aluPass',
		'aluEscuela'
	);
}
