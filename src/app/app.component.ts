import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Scheduler';
  _sidebarOpen = false;
  faHome = faHome;

  private pages = [
    {
      name: 'Home',
      path: ''
    },
    {
      name: 'Picker',
      path: '/picker'
    },
    {
      name: 'Students',
      path: '/students'
    },
    {
      name: 'Classes',
      path: '/classes'
    },
  ]

  toggleSidebar(): void {
    this._sidebarOpen = !this._sidebarOpen;
  }
}
