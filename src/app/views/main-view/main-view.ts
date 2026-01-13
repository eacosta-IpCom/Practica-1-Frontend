import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
// Corregimos el nombre del import: de 'List' a 'TaskListComponent'
import { TaskListComponent } from '../../components/list/list';

@Component({
  selector: 'app-main-view',
  standalone: true, // Mantener standalone arriba o abajo es igual, pero debe ser consistente
  imports: [MatToolbarModule, MatButtonModule, TaskListComponent], // Usar el nombre corregido
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
})
export class MainView {}
