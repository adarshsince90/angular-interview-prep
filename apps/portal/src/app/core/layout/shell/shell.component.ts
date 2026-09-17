import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuickRecapDrawerComponent } from '../drawer/quick-recap-drawer.component';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    QuickRecapDrawerComponent,
    SearchModalComponent,
    ScrollToTopComponent
  ],
  template: `
    <div class="shell-root">
      <app-header />
      <div class="shell-body">
        <app-sidebar />
        <main class="main-viewport">
          <router-outlet />
        </main>
      </div>
      <app-quick-recap-drawer />
      <app-search-modal />
      <app-scroll-to-top />
    </div>
  `,
  styles: [`
    .shell-root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative;
    }

    .shell-body {
      display: flex;
      flex: 1;
      max-width: 1600px;
      margin: 0 auto;
      width: 100%;
      padding-bottom: 2rem;
    }

    .main-viewport {
      flex: 1;
      min-width: 0; /* Prevents overflow blowout */
      padding: 0 1.5rem;
    }

    @media (max-width: 900px) {
      .main-viewport {
        padding: 0 1rem;
      }
    }
  `]
})
export class ShellComponent {}
