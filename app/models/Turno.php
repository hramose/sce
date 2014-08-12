<?php 

class Turno extends Eloquent
{
	protected $table = 'turnos';
	protected $primaryKey = 'turId';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array( 
		'turId',
		'turNombre',
		'turEstado'
	); 
}