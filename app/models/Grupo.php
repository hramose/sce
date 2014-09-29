<?php
class Grupo extends Eloquent
{
  protected $table = 'grupos';
  protected $primaryKey = 'grupId';
  public $timestamps = false;
  public $incrementing = true;
  protected $fillable = array(
    'grupId',
    'grupNombre',
    'grupEstado'
  );

   public function ciclos()
    {
        return $this->belongsTo('Ciclos', 'grupId');
        /*Relacion Inversa 
          belongsTo('modelo a donde pertecene la relación','id de la tabla padre en la tabla actual')
        */
        // El primero es la tabla a donde pertecene la relación
        // El segundo es el id de la tabla padre en la tabla actual
        // En este caso seria el id de Asignatura en tema
    }
}
