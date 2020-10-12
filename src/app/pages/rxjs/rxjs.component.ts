import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, map, take, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription

  constructor() {
    // this.retornaObservable().pipe(
    //   retry()
    // )
    //   .subscribe(
    //     valor => console.log('Algo: ' + valor),
    //     error => console.warn(error),
    //     () => console.info('Obs terminado')

    //   );
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo() {

    return interval(100)
      .pipe(
        // take(10),
        map(valor => valor + 1),
        filter(valor => valor % 2 === 0)
      )
  }

  retornaObservable() {

    let i = -1;
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i)

        if (i === 4) {
          clearInterval(intervalo)
          observer.complete()
        }
      }, 1000);

    })

  }


}
