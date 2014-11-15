<?php

class EstadisticasController extends BaseController
{
//Consulta para obtener estadisticas de un grupo seleccionado (promedios por bimestre) en el ciclo completo
public function estadisticasCiclo(){
		if ( !Usuario::isAdmin() )
		return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['grado']);

$busqueda = Ciclo::join('grupos', 'ciclos.cicGrupo', '=', 'grupos.grupId')	
				 ->join('identificador', 'ciclos.cicId', '=', 'identificador.ideCiclo')
				 ->join('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->join('asignaturas',  'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
				 ->select(DB::raw('asignaturas.asigClave, asignaturas.asigArea,asigId, asignaturas.asigNombre,
				   round(avg(if(calificaciones.calBimestre =1,calificaciones.calCalificacion,null)),1) as proB1,
				   round(avg(if(calificaciones.calBimestre =2,calificaciones.calCalificacion,null)),1) as proB2,
				   round(avg(if(calificaciones.calBimestre =3,calificaciones.calCalificacion,null)),1) as proB3,
				   round(avg(if(calificaciones.calBimestre =4,calificaciones.calCalificacion,null)),1) as proB4,
				   round(avg(if(calificaciones.calBimestre =5,calificaciones.calCalificacion,null)),1) as proB5,
				   round(avg(if(calificaciones.calBimestre ,calificaciones.calCalificacion,null)),1) as proG'))
				 ->where('ciclos.cicId', $gradoSel)
				 ->orderBy('ciclos.cicGrado')
   				 ->orderBy('grupos.grupNombre')
				 ->groupBy('calificaciones.calAsignatura')
				 ->get()
                 ->toArray();

		if( count($busqueda)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $busqueda,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);
	}

//Consulta retorna total alumnos, aprobados y no aprobados en un ciclo de un grupo elegido
public function getAprobReprobGrupo(){
		if ( !Usuario::isAdmin() )
		return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['grado2']);


$busqueda = Identificador::join('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->join('asignaturas',  'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
				 ->select(DB::raw('asignaturas.asigClave, asignaturas.asigArea, asignaturas.asigNombre,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =1,calificaciones.calAsignatura,null)) as apr1, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =1,calificaciones.calAsignatura,null)) as repr1,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =2,calificaciones.calAsignatura,null)) as apr2, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =2,calificaciones.calAsignatura,null)) as repr2,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =3,calificaciones.calAsignatura,null)) as apr3, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =3,calificaciones.calAsignatura,null)) as repr3,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =4,calificaciones.calAsignatura,null)) as apr4, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =4,calificaciones.calAsignatura,null)) as repr4,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =5,calificaciones.calAsignatura,null)) as apr5, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =5,calificaciones.calAsignatura,null)) as repr5'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->orderBy('asignaturas.asigNombre')
				 ->groupBy('calificaciones.calAsignatura')
				 ->get()
                 ->toArray();


		if( count($busqueda)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $busqueda,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);	

	}


//Consulta retorna materias con rangos de calificaciones especificos
public function getRangosCalificaciones(){
		if ( !Usuario::isAdmin() )
		return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['grado3']);
	
$rangos = Identificador::join('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
					 ->join('asignaturas',  'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
					 ->select(DB::raw('asignaturas.asigNombre,
					   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 && calificaciones.calBimestre =1,identificador.ideAlumno,null)) as cal101, 
					   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   && calificaciones.calBimestre =1,identificador.ideAlumno,null)) as cal91,
					   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   && calificaciones.calBimestre =1,identificador.ideAlumno,null)) as cal81, 
					   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7	  && calificaciones.calBimestre =1,identificador.ideAlumno,null)) as cal71,
					   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   && calificaciones.calBimestre =1,identificador.ideAlumno,null)) as cal61,
	 				   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 && calificaciones.calBimestre =2,identificador.ideAlumno,null)) as cal102, 
					   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   && calificaciones.calBimestre =2,identificador.ideAlumno,null)) as cal92,
					   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   && calificaciones.calBimestre =2,identificador.ideAlumno,null)) as cal82, 
					   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7   && calificaciones.calBimestre =2,identificador.ideAlumno,null)) as cal72,
					   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   && calificaciones.calBimestre =2,identificador.ideAlumno,null)) as cal62,
	 				   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 && calificaciones.calBimestre =3,identificador.ideAlumno,null)) as cal103, 
					   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   && calificaciones.calBimestre =3,identificador.ideAlumno,null)) as cal93,
					   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   && calificaciones.calBimestre =3,identificador.ideAlumno,null)) as cal83, 
					   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7   && calificaciones.calBimestre =3,identificador.ideAlumno,null)) as cal73,
					   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   && calificaciones.calBimestre =3,identificador.ideAlumno,null)) as cal63,
	 				   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 && calificaciones.calBimestre =4,identificador.ideAlumno,null)) as cal104, 
					   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   && calificaciones.calBimestre =4,identificador.ideAlumno,null)) as cal94,
					   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   && calificaciones.calBimestre =4,identificador.ideAlumno,null)) as cal84, 
					   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7   && calificaciones.calBimestre =4,identificador.ideAlumno,null)) as cal74,
					   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   && calificaciones.calBimestre =4,identificador.ideAlumno,null)) as cal64,
	 				   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 && calificaciones.calBimestre =5,identificador.ideAlumno,null)) as cal105, 
					   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   && calificaciones.calBimestre =5,identificador.ideAlumno,null)) as cal95,
					   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   && calificaciones.calBimestre =5,identificador.ideAlumno,null)) as cal85, 
					   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7   && calificaciones.calBimestre =5,identificador.ideAlumno,null)) as cal75,
					   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   && calificaciones.calBimestre =5,identificador.ideAlumno,null)) as cal65'))
					 ->where('identificador.ideCiclo', $gradoSel)
					 ->orderBy('asignaturas.asigNombre')
					 ->groupBy('calificaciones.calAsignatura')
					 ->get()
	                 ->toArray();


		if( count($rangos)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $rangos,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);	
	}



//Consulta retorna total general alumnos
public function getTotalAlumnos(){
	if ( !Usuario::isAdmin() )
	return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['gradoElegido']);


$totalAlumnos = Identificador::select(DB::raw('count(identificador.ideAlumno) as totAlumnos'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->groupBy('identificador.ideCiclo')
				 ->get()
				 ->toArray();

		if( count($totalAlumnos)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $totalAlumnos,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);	

	}


//Obtiene todos los ciclos BD para elegir en la vista
 	public static function getCiclos(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$busquedaCiclos = Ciclo::groupBy('cicCiclo')
								->get(array(
								'cicId',
								'cicCiclo'
								))
								->toArray();
		return $busquedaCiclos;
	}

//Obtiene todos los grados y grupos pertenecientes al ciclo elegido 
 	public static function getGrados(){

		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');
		$data = Input::all();
		$cicloSelect = trim($data['ciclo']);

		$busquedaGrados = Ciclo::leftJoin('grupos', 'ciclos.cicGrupo', '=', 'grupos.grupId')
			->where ('ciclos.cicCiclo', $cicloSelect)
			->orderBy('ciclos.cicGrado')
   			->orderBy('grupos.grupNombre')
			->get(array('cicId','cicGrado',
						'grupos.grupNombre'))
			->toArray();

		return $busquedaGrados;
	}
	

	
public function estadisticasBimestreAsignatura(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['grado']);
		$asignaturaSel = trim($data['id']);
		
$busqueda = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->leftJoin('asignaturas', 'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
				 ->leftJoin('alumnos',  'identificador.ideAlumno', '=', 'alumnos.aluCurp')	
				 ->leftJoin('profesores',  'calificaciones.calProfesor', '=', 'profesores.profCurp')	
				 ->select(DB::raw('alumnos.aluCurp,alumnos.aluApep,alumnos.aluApem, alumnos.aluNombre, 
				 	calificaciones.calBimestre, profesores.profNombre,
				 	round(avg(if(calificaciones.calBimestre =1,calificaciones.calCalificacion,null)),1) as proB1,
				    round(avg(if(calificaciones.calBimestre =2,calificaciones.calCalificacion,null)),1) as proB2,
				    round(avg(if(calificaciones.calBimestre =3,calificaciones.calCalificacion,null)),1) as proB3,
				    round(avg(if(calificaciones.calBimestre =4,calificaciones.calCalificacion,null)),1) as proB4,
				    round(avg(if(calificaciones.calBimestre =5,calificaciones.calCalificacion,null)),1) as proB5'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calAsignatura', $asignaturaSel)
				 ->orderBy('alumnos.aluApep')
				 ->groupBy('calificaciones.calIdentificador')
				 ->get()
                 ->toArray();

  $materia = Asignatura::where('asigId',  $asignaturaSel)  
  				 ->get()
                 ->toArray();         

		if( count($busqueda)>0 ){
		    $datos = array(
					'materia' => $materia[0],
					'busqueda' => $busqueda
				);
				$response = array(
					'status' => 'OK',
					'data' => $datos,
					'message' => 'Búsqueda exitosa'
				);
			}
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);
	}

	
public function estadisticasBimestre(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['grado']);
		$bimestreSel = trim($data['bimestre']);
           
$busqueda = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->leftJoin('asignaturas', 'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
				 ->leftJoin('alumnos',  'identificador.ideAlumno', '=', 'alumnos.aluCurp')		
				 ->select(DB::raw('alumnos.aluCurp,alumnos.aluApep,alumnos.aluApem, alumnos.aluNombre,asignaturas.asigArea, asignaturas.asigNombre,
				   round(if(calificaciones.calAsignatura=(select calificaciones.calAsignatura),calificaciones.calCalificacion,null),1) as proB1'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
				 ->orderBy('alumnos.aluApep')
				 ->orderBy('alumnos.aluApem')
				 ->orderBy('alumnos.aluNombre')
				 ->orderBy('asignaturas.asigNombre')
				 ->get()
                 ->toArray();

		if( count($busqueda)>0 ){
		     $response = array(
					'status' => 'OK',
					'data' => $busqueda,
					'message' => 'Búsqueda exitosa'
				);
			}
		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);
	}

	
public function getAprobReprobBimestre(){
		if ( !Usuario::isAdmin() )
		return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['gradoAR']);
		$bimestreSel = trim($data['bimestreAR']);

$busqueda = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->leftJoin('asignaturas',  'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
				 ->select(DB::raw('asignaturas.asigClave, asignaturas.asigArea, asignaturas.asigNombre,
				   count(if(calificaciones.calCalificacion >=6 ,calificaciones.calAsignatura,null)) as apr1, 
				   count(if(calificaciones.calCalificacion <6 ,calificaciones.calAsignatura,null)) as repr1'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
   				 ->orderBy('asignaturas.asigNombre')
				 ->groupBy('calificaciones.calAsignatura')
				 ->get()
                 ->toArray();


		if( count($busqueda)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $busqueda,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);	
	}

public function getRangosCalifBimestre(){
		if ( !Usuario::isAdmin() )
		return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['gradoRangos']);
		$bimestreSel = trim($data['bimestreRangos']);
	
$rangos = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->leftJoin('asignaturas', 'calificaciones.calAsignatura', '=', 'asignaturas.asigId')	
				 ->select(DB::raw('asignaturas.asigArea, asignaturas.asigNombre,
				   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 ,identificador.ideAlumno,null)) as cal10, 
				   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   ,identificador.ideAlumno,null)) as cal9,
				   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   ,identificador.ideAlumno,null)) as cal8, 
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7	  ,identificador.ideAlumno,null)) as cal7,
				   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   ,identificador.ideAlumno,null)) as cal6'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
   				 ->orderBy('asignaturas.asigNombre')
				 ->groupBy('calificaciones.calAsignatura')
				 ->get()
                 ->toArray();


		if( count($rangos)>0 )
			$response = array(
				'status' => 'OK',
				'data' => $rangos,
				'message' => 'Búsqueda exitosa'
				);

		else
			$response = array(
				'status' => 'ERROR',
				'message' => 'No se encontraron resultados'
				);
			return Response::json($response);	
	}

	
}
