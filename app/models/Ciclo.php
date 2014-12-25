<?php
class Ciclo extends Eloquent
{
	protected $table = 'ciclos';
	protected $primaryKey = 'cicId';
	public $timestamps = false;
	public $incrementing = true;
	protected $fillable = array(
		'cicId',
		'cicCiclo',
		'cicGrado',
		'cicGrupo'
	);
}
