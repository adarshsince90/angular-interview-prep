import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FlashcardsHubComponent } from './features/flashcards-hub/flashcards-hub.component';
import { VisualizerLabComponent } from './features/visualizer-lab/visualizer-lab.component';
import { TopicReaderComponent } from './features/topic-reader/topic-reader.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'flashcards',
        component: FlashcardsHubComponent
      },
      {
        path: 'labs',
        component: VisualizerLabComponent
      },
      {
        path: 'topic/:id',
        component: TopicReaderComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

