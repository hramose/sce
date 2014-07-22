<?php

class Usuario
{
	public static function isAdmin(){
		if ( Session::has('tipo') && Session::get('tipo') == '1' )
			return true;
		else
			return false;
	}
}