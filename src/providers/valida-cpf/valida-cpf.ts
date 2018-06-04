import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the ValidaCpfProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidaCpfProvider {

  constructor(public http: Http) {
    
  }

validaCNPJ(cnpj:any) {

  var numeros;
  var digitos;
  var soma;
  var i;
  var resultado;
  var pos;
  var tamanho;
  var digitos_iguais = 1;

  if (cnpj.length == 0) {
    return false;
  }

  var value = cnpj.replace(/\D+/g, '');

  for (i = 0; i < value.length - 1; i++)
    if (value.charAt(i) != value.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }

  if (digitos_iguais)
    return false;

  tamanho = value.length - 2;
  numeros = value.substring(0, tamanho);
  digitos = value.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) {
    return false;
  }
  tamanho = tamanho + 1;
  numeros = value.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  return (resultado == digitos.charAt(1));
}



  validaCPF(cpf: string): boolean {
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    }
    else {
      return true;
    }
  }

  

}
