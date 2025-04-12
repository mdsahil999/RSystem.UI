import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./story/story.module').then(m => m.StoryModule),
    pathMatch: 'full' // Ensures the empty path matches fully
  },
  {
    path: '**',
    redirectTo: '' // Redirect unknown paths to root
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
