import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { TopicReaderComponent } from './features/topic-reader/topic-reader.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'topic/01-why-angular'
      },
      {
        path: 'topic/:id',
        component: TopicReaderComponent
      },
      {
        path: '**',
        redirectTo: 'topic/01-why-angular'
      }
    ]
  }
];
