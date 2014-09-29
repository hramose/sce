function validar(){
	this.validarDatos = function validarDatos( nombre, clave ){
		var patt = new RegExp( '^[á-úÁ-Úa-zA-Z \t]*$' );
		//var patt = new RegExp('^[á-úa-z(ñ)]*$', 'i');
		if( txtNombre.val() ==="" || !patt.test(txtNombre.val()) ){
			alert('Indique un nombre válido de asignatura');
			txtNombre.focus();
			return false;
		}
		var patt = new RegExp( '^[0-9]*$' );
		if( txtClave.val() ==="" || !patt.test(txtClave.val()) || 
			txtClave.val().length > 10 ){
			alert('Indique una clave válida de asignatura');
			txtClave.focus();
			return false;
		}	
		return true;	
	};
}