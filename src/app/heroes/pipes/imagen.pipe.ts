import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  //pure:false //puer siginifica pipe puro o impuro, cuando es false se dispara a cada cambio de angular y true solo se dispara cuando cambia un atributo
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
   
    if(!heroe.id && !heroe.alt_img){
      return `assets/no-image.png`;
    }else if (heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;
    }
    
  
}
}
