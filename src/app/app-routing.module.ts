import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
    {
      path:'auth',
      //esto hace lazyload o carga peresosa, hace que cuando alguien lo requiere recien carga el modulo con contiene las rutas hijas
      loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    },
    {
      path:'heroes',
      loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
      canLoad:[AuthGuard],
      canActivate:[AuthGuard]
    },
    {
      path:'404',
      component: ErrorPageComponent
    },
    {
      path:'**',
      redirectTo: '404'
    }
]

@NgModule({

  imports: [
    RouterModule.forRoot( routes )    
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule  { }
