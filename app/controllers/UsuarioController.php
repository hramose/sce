<?php

class UsuarioController extends BaseController
{
	/* Función para ingresar */
	public function login(){
		/* Datos de entrada provenientes del formulario */
		$datos = Input::all();

		/* Valida si se recibieron los datos, de lo contrario redirecciona */
		if ( !array_key_exists('usuario', $datos) || $datos['usuario'] === "" ){
			Session::flush();
			return Redirect::to('/?e=1');
		}

		if ( !array_key_exists('pass', $datos) || $datos['pass'] === "" ){
			Session::flush();
			return Redirect::to('/?e=1');
		}

		if ( !array_key_exists('tipo', $datos) || $datos['tipo'] === "" ){
			Session::flush();
			return Redirect::to('ingresar?e=1');
		}

		/* Reglas de validación */
		$rules = array(
				'usuario' => 'required',
				'pass' => 'required',
				'tipo' => 'required'
			);

		/* Validación de datos con Laravel */
		$validator = Validator::make($datos, $rules);

		/* Si la validación falla redirecciona una página atrás */
		if( $validator->fails() ){
			Session::flush();
			return Redirect::back()->whitErrors( $validator );
		}

		/* Si es alumno */
		if( $datos['tipo'] === '0' ){
			return Redirect::to('/');
		}elseif ( $datos['tipo'] === '1' ){
			return Redirect::to('/');
		}
		/* Tipo usuario: Administrador */
		elseif ( $datos['tipo'] === '2' ){
			$admin = Administrador::where('admNombre', $datos['usuario'])
				->get();

			/* Si se obtuvieron resultados */
			if ( count( $admin ) > 0 ){
				/* Si coincide la contraseña */
				if ( Hash::check($datos['pass'], $admin[0]->admPass) ){
					Session::put('id', '1');
					Session::put('tipo', '1');
					Session::put('nombre', 'Administrador');
					return Redirect::to('/admin');
				}else
					return Redirect::to('/?e=1');
			}else
				return Redirect::to('/?e=1');
		}
	}

	/* Función para salir */
	public function logout(){
		Session::flush();
		Cache::flush();
		Cookie::forget('sce_session');
		return Redirect::to('/', 302)
			->header('cache-control', 'no-store, no-cache, must-revalidate')
			->header('pragma', 'no-cache');
	}
}