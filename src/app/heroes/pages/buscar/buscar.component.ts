import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})

export class BuscarComponent {
termino:string=''
heroes:Heroe[]=[]
hereoSeleccionado:Heroe | undefined; 

constructor(private heroesService:HeroesService) {
  
}

buscando(){
 this.heroesService.getSugerencias(this.termino.trim())
  .subscribe(heroesSugerido => {
      this.heroes = heroesSugerido
      console.log(this.heroes)
  })
}


opcionSeleccionada( event:MatAutocompleteSelectedEvent){
  

 if(!event.option.value){
  this.hereoSeleccionado = undefined
  return;
}

  const heroeclickeado:Heroe = event.option.value

  this.termino= heroeclickeado.superhero
  
    this.heroesService.getHeroePorId(heroeclickeado.id!)
        .subscribe(heroe => {
          this.hereoSeleccionado =  heroe
        })
}

}


