import { Component } from '@angular/core';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [' Test ', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
    [20, 450, 100],
  ];
 
}
