import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })

    // const promesa = new Promise( (resolve, reject) => {

    //   if(false){

    //     resolve('Hola mundo')
    //   }else{

    //     reject('Me rompi')
    //   }

    // });

    // promesa.then( (res) => {
    //   console.log(res);
    // })
    // .catch(error => console.log(error)
    // )

    // console.log('Fin del init');
    
    
  }

  getUsuarios(){

    return new Promise( resolve => {
      
      fetch('https://reqres.in/api/users')
      .then( resp =>  resp.json() )
      .then( body => resolve(body.data) )

    });


  }

}
