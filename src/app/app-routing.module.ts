import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {path:'',redirectTo:'browse', pathMatch:'full'},
  {path:'browse',component:TableComponent},
  {path:'search',component:TableComponent,data:{isSearch:true}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
