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
				 ->join('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->join('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')		 
				 ->select(DB::raw("asignaturas.asigClave, asignaturas.asigArea,asigId, asignaturas.asigNombre,
				   round(avg(if(calificaciones.calBimestre =1,calificaciones.calCalificacion,null)),1) as proB1,
				   round(avg(if(calificaciones.calBimestre =2,calificaciones.calCalificacion,null)),1) as proB2,
				   round(avg(if(calificaciones.calBimestre =3,calificaciones.calCalificacion,null)),1) as proB3,
				   round(avg(if(calificaciones.calBimestre =4,calificaciones.calCalificacion,null)),1) as proB4,
				   round(avg(if(calificaciones.calBimestre =5,calificaciones.calCalificacion,null)),1) as proB5,
				   round(avg(if(calificaciones.calBimestre ,calificaciones.calCalificacion,null)),1) as proG"))
				 ->where('ciclos.cicId', $gradoSel)
				 ->orderBy('ciclos.cicGrado')
   				 ->orderBy('grupos.grupNombre')
				 ->groupBy('calificaciones.calDocente')
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
				'message' => 'No se encontraron resultados en Estadisticas ciclo'
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
				 ->join('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->join('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
				 ->select(DB::raw('asignaturas.asigClave, asignaturas.asigArea, asignaturas.asigNombre,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =1,calificaciones.calDocente,null)) as apr1, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =1,calificaciones.calDocente,null)) as repr1,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =2,calificaciones.calDocente,null)) as apr2, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =2,calificaciones.calDocente,null)) as repr2,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =3,calificaciones.calDocente,null)) as apr3, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =3,calificaciones.calDocente,null)) as repr3,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =4,calificaciones.calDocente,null)) as apr4, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =4,calificaciones.calDocente,null)) as repr4,
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calBimestre =5,calificaciones.calDocente,null)) as apr5, 
				   count(if(calificaciones.calCalificacion <6 && calificaciones.calBimestre =5,calificaciones.calDocente,null)) as repr5'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->orderBy('asignaturas.asigNombre')
				 ->groupBy('calificaciones.calDocente')
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
			         ->join('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
					 ->join('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
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
					 ->groupBy('calificaciones.calDocente')
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
				 ->leftJoin('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->leftJoin('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
                 ->leftJoin('profesores',  'docentes.docProfesor', '=', 'profesores.profCurp')	
				 ->leftJoin('alumnos',  'identificador.ideAlumno', '=', 'alumnos.aluCurp')	
				 ->select(DB::raw("alumnos.aluCurp,alumnos.aluApep,alumnos.aluApem, alumnos.aluNombre, 
				 	calificaciones.calBimestre, profesores.profNombre,
				 	round(avg(if(calificaciones.calBimestre =1,calificaciones.calCalificacion,null)),1) as proB1,
				    round(avg(if(calificaciones.calBimestre =2,calificaciones.calCalificacion,null)),1) as proB2,
				    round(avg(if(calificaciones.calBimestre =3,calificaciones.calCalificacion,null)),1) as proB3,
				    round(avg(if(calificaciones.calBimestre =4,calificaciones.calCalificacion,null)),1) as proB4,
				    round(avg(if(calificaciones.calBimestre =5,calificaciones.calCalificacion,null)),1) as proB5"))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('docentes.docAsignatura', $asignaturaSel)
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

	
public function cadenaMateriasBimestre(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['grado']);
		$bimestreSel = trim($data['bimestre']);
           
		      
 $busqueda = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
 				 ->leftJoin('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->leftJoin('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
                 ->select(DB::raw("CONCAT('aluCurp,aluApep,aluApem,aluNombre,',GROUP_CONCAT(DISTINCT CONCAT('round(max(if(asigIdNom=''',asigIdNom,''',calCalificacion,NULL)),1) AS ',asigIdNom)),'') as cadena"))
				 ->where('calificaciones.calBimestre', $bimestreSel)
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

	
public function materiasBimestre(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['gradoM']);
		$bimestreSel = trim($data['bimestreM']);

		$materias = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
 				 ->leftJoin('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->leftJoin('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
                 ->where('docentes.docCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
				 ->orderBy('asignaturas.asigId')
				 ->groupBy('asignaturas.asigNombre')
                 ->get(array('asignaturas.asigNombre'))
				 ->toArray();

		if( count($materias)>0 ){
		     $response = array(
					'status' => 'OK',
					'data' => $materias,
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


public function calificacionesBimestre(){
		if ( !Usuario::isAdmin() )
			return Redirect::to('admin/logout');

		$data = Input::all();
		$gradoSel = trim($data['gradod']);
		$bimestreSel = trim($data['bimestred']);
        $cadena = trim($data['cadena']);
  //$cadena = "round(max(if(asignaturas.asigNombre = 'Español',calificaciones.calCalificacion,null)),1) as proB1, round(max(if(asignaturas.asigNombre = 'Matematicas',calificaciones.calCalificacion,null)),1) as proB2";
             $busquedad = Identificador::leftJoin('calificaciones', 'identificador.ideId', '=', 'calificaciones.calIdentificador')	
				 ->leftJoin('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->leftJoin('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
                 ->leftJoin('profesores',  'docentes.docProfesor', '=', 'profesores.profCurp')	
				 ->leftJoin('alumnos',  'identificador.ideAlumno', '=', 'alumnos.aluCurp')	
 				 ->select(DB::raw($cadena))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
				 ->orderBy('alumnos.aluApep')
				 ->groupBy('calificaciones.calIdentificador')
				 ->get()
                 ->toArray();

		if( count($busquedad)>0 ){
		     $response = array(
					'status' => 'OK',
					'data' => $busquedad,
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
				 ->leftJoin('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->leftJoin('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
                 ->select(DB::raw('asignaturas.asigClave, asignaturas.asigArea, asignaturas.asigNombre,
				   count(if(calificaciones.calCalificacion >=6 ,calificaciones.calDocente,null)) as apr1, 
				   count(if(calificaciones.calCalificacion <6 ,calificaciones.calDocente,null)) as repr1'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
				 ->orderBy('asignaturas.asigId')
				 ->groupBy('calificaciones.calDocente')
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
				 ->leftJoin('docentes', 'calificaciones.calDocente', '=', 'docentes.docId')	
				 ->leftJoin('asignaturas', 'docentes.docAsignatura', '=', 'asignaturas.asigId')	
                 ->select(DB::raw('asignaturas.asigArea, asignaturas.asigNombre,
				   count(if(calificaciones.calCalificacion >=9 && calificaciones.calCalificacion <=10 ,identificador.ideAlumno,null)) as cal10, 
				   count(if(calificaciones.calCalificacion >=8 && calificaciones.calCalificacion <9   ,identificador.ideAlumno,null)) as cal9,
				   count(if(calificaciones.calCalificacion >=7 && calificaciones.calCalificacion <8   ,identificador.ideAlumno,null)) as cal8, 
				   count(if(calificaciones.calCalificacion >=6 && calificaciones.calCalificacion <7	  ,identificador.ideAlumno,null)) as cal7,
				   count(if(calificaciones.calCalificacion >=5 && calificaciones.calCalificacion <6   ,identificador.ideAlumno,null)) as cal6'))
				 ->where('identificador.ideCiclo', $gradoSel)
				 ->where('calificaciones.calBimestre', $bimestreSel)
   				 ->orderBy('asignaturas.asigId')
				 ->groupBy('calificaciones.calDocente')
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
