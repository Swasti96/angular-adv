import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
}) 
export class IncrementadorComponent implements OnInit{

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  //De esta forma renombramos el imput que va a cargar el componente padre Ej: @Input('test'), el componente padre al pasar un valor deberia referenciar a test
  @Input('valor') progreso : number = 10;
  @Input() btnClass : string = 'btn-primary';

  //El valor que emitimos por el output "valorDeSalida" es el valor que recibe el padre y que se vera reflejado en el progressbar
  @Output() valorDeSalida : EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${ this.progreso }%`;
  }

  cambiarValor(valor: number) {

    //Si el valor de carga es positivo y supera 100, seteamos como valor 100, y emitimos por @Output 100
    if( this.progreso >= 100 && valor >= 0 ) {
      this.valorDeSalida.emit(100);
      return this.progreso = 100;
    }
    //Si el valor de carga es negativo y es menor 0, seteamos como valor 0, y emitimos por @Output 0
    if( this.progreso <= 0 && valor < 0 ) {
      this.valorDeSalida.emit(0);
      return this.progreso = 0;
    }    

    this.progreso = this.progreso + valor;    
    this.valorDeSalida.emit(this.progreso);
  }

  onChange(nuevoValor: number){
    
    if(nuevoValor >= 100) {
      this.progreso = 100;
    }else if(nuevoValor <= 0) {
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }

    this.valorDeSalida.emit(this.progreso)
  }

}
