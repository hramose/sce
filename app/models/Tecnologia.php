<? php

class Tecnologia extends Eloquent
{
	protected $table = 'tecnologias';
	protected $primarykey = 'tecNombre';
	public $timestamps = false;
	public $incrementing = false;
	protected $fillable = array(
		'tecNombre'
		);
}