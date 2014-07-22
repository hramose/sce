<?php

class Administrador extends Eloquent
{
	protected $table = 'administrador';
	protected $primaryKey = 'admId';
	public $timestamps = false;
	public $incrementing = true;
	protected $fillable = array(
		'admPass'
	);
}