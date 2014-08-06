<? php

class Arte extends Eloquent
{
	protected $table = 'artes';
	protected $primarykey = 'artNombre';
	public $timestamps = false;
	public $incrementting = false;
	protected $fillable = array(
		'artNombre'
		);
}