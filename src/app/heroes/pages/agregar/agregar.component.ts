import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius:5px;
    }
  `
  ]
})

export class AgregarComponent implements OnInit {

  constructor(private HeroesService:HeroesService,
              private ActivatedRoute:ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog  ){}

  publishers = [
    {
      id:'DC COMIC',
      descipcion:'Dc-Comic'
    },
    {
      id:'MARVEL COMIC',
      descipcion:'Marvel-Comic'
    }
  ];

  heroe:Heroe = {
        superhero: '',
        publisher:Publisher.DCComics,
        alter_ego: '',
        first_appearance: '',
        characters: '',
        alt_img:'',
  }



ngOnInit(): void{
    
//por la ruta vemos donde estamos si en agregar o editar
  
 if(this.router.url.includes('editar')){
   
    this.ActivatedRoute.params
         .pipe(
          switchMap( ({id}) => this.HeroesService.getHeroePorId(id))
       )
         .subscribe( heroe => this.heroe = heroe )

 }
 


  }
  

guardar(){

  if(this.heroe.superhero.trim().length===0){return;}

  if(this.heroe.id){
      //actualizamos
      this.HeroesService.actualizarHeroe(this.heroe).subscribe(
        heroe => this.mostrarSnakbar("Registro Actualizado"))
  }else{
    //creamos nuevo
    this.HeroesService.guardarHeroe(this.heroe)
    .subscribe( heroe => {
      this.mostrarSnakbar("Registro Creado Correctamente")
      this.router.navigate(['./heroes/editar', heroe.id])
    })
  }
}

borrar(){

 const dialogo = this.dialog.open(ConfirmarComponent,{
    width:'450px',
    data:this.heroe
  })

  dialogo.afterClosed().subscribe( 
    respu => {
      if(respu){
             this.HeroesService.borrarHeroe(this.heroe.id!).subscribe(
              resp => {
              this.router.navigate(['./heroes']);
               } )
      }
    }
  )

 

}

mostrarSnakbar(mensaje:string){
  this.snackBar.open(mensaje,"ok!!",{
    duration:2500,
    horizontalPosition:'center'
  })
}


}
