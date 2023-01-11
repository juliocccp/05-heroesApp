import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{  
      width:100%;
      border-radius:5px}
    `
  ]
})
export class HeroeComponent implements OnInit {
  
  heroe!:  Heroe;

  constructor(private activateRouter:ActivatedRoute,
              private HeroesService: HeroesService,
              private router:Router //este importamos para poder programar el regresar 
    ) {}


  ngOnInit() {

    //mediante activateRouter recibimos los parametros de la ruta
    this.activateRouter.params
    .pipe(
      switchMap(({id}) => this.HeroesService.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe =  heroe) 
  }

  regresar(){
   this.router.navigate(['/heroes/listado'])
  }
}
