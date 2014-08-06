function ValidarDatos(){
  this.validaInfo = function validaInfo(curp, nombre, perfil, telefono, direccion){

    if ( curp.length === 18 ){
      reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9][0-9]/;
      if(curp.search(reg)){     /*.search() regresa posicion n si encuentra coinsidencia, -1 si no encuentra coinsidencias */
			     alert("La curp: " + curp + " no es valida, verifiqué ");
           txtCurpP.focus();
			     return false;
			}
    }
    else {
      tamCurp = curp.length;
      if((tamCurp <10)||(tamCurp === null)){
         alert("Indique una CURP valida.");
         txtCurpP.focus();
         return false;
      }
      else{
        switch (tamCurp){
              case 10 :
                    reg = /[A-Z]{4}\d{6}/;
                    break;
              case 11 :
                    reg = /[A-Z]{4}\d{6}[HM]/;
                    break;
              case 12 :
                    reg = /[A-Z]{4}\d{6}[HM][A-Z]/;
                    break;
              case 13 :
                    reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}/;
                    break;
              case 14 :
                    reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]/;
                    break;
              case 15 :
                    reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{2}/;
                    break;
              case 16 :
                    reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}/;
                    break;
              case 17 :
                    reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]/;
                    break;
        }
        if(curp.search(reg)){
           alert("Indique una CURP valida");
           txtCurpP.focus();
           return false;
        }
        else{
           alert("Es necesario proporcionar los 18 caracteres que componen la CURP");
           txtCurpP.focus();
           return false;
        }

      }
    }

    if ( nombre === "" ){
      alert('Indique el nombre del profesor');
      txtNombreP.focus();
      return false;
    }
    if ( perfil === "" ){
      alert('Indique el perfil del profesor');
      txtPerfilP.focus();
      return false;
    }
    if ( telefono === "" ){
      alert('Indique el teléfono del profesor');
      txtTelefonoP.focus();
      return false;
    }
    if ( direccion === "" ){
      alert('Indique la dirección del profesor');
      txtDireccionP.focus();
      return false;
    }
    return true;
  };
}

function pasarMayusculas(){
  var valorCurp, curpMayuscula;
  valorCurp = txtCurpP.val();
  curpMayuscula = valorCurp.toUpperCase();
  txtCurpP.val(curpMayuscula);
}
