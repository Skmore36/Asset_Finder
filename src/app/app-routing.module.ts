import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
   { path:'home', component:HomeComponent},
   { path:'asset_details', component:AssetDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
