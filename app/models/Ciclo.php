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

	public function grupos(){
    return $this->hasMany('Grupo','cicGrupo');
		/*hasMany('Modelo con que se relaciona','llave foranea', 'id con el que se relacionan')
		 funcion para relacion uno a muchos
		 un ciclo tiene varios grupos
		*/
  }
}
