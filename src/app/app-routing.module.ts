import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepreneursComponent } from './components/entrepreneurs/entrepreneurs.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'emprendedores', component: EntrepreneursComponent },
  { path: '**', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
