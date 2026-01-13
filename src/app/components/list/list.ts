/*import { Component, OnInit, viewChild } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { ITask } from '../../Interfaces/itask';
import { TaskService } from '../../Services/TaskService/task-service';
import { FormUpdate } from '../form-update/form-update';
import { FormCreate } from '../form-create/form-create';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'; //Se agrega importación para paginador


@Component({
  selector: 'app-list',
  imports: [MatTableModule,FormUpdate, FormCreate, MatPaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
  standalone: true
})
export class List implements OnInit {
  displayedColumns: string[] = ['NO.', 'Título','Comentarios', 'Completada'];
  dataSource = new MatTableDataSource<ITask>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    let result = this.taskService.getAll().then(data=>{
      this.dataSource.data=data.payload;
    });
  }
public async loadTasks() {
    try {
      const data = await this.taskService.getAll();
      this.dataSource.data = data.payload;
      console.log('Datos cargados con éxito');
    } catch (error) {
      console.error('Error al cargar la tabla', error);
    }
  }


}*/

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Agregamos AfterViewInit y corregimos ViewChild
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ITask } from '../../Interfaces/itask';
import { TaskService } from '../../Services/TaskService/task-service';
import { FormUpdate } from '../form-update/form-update';
import { FormCreate } from '../form-create/form-create';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  imports: [MatTableModule, FormUpdate, FormCreate, MatPaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
  standalone: true
})
export class List implements OnInit {

  displayedColumns: string[] = ['NO.', 'Título', 'Comentarios', 'Completada'];
  dataSource = new MatTableDataSource<ITask>([]);
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); 
  }

  public async loadTasks() {
    try {
      const data = await this.taskService.getAll();
      this.dataSource.data = data.payload;
      
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });

      console.log('Datos cargados con éxito');
    } catch (error) {
      console.error('Error al cargar la tabla', error);
    }
  }
}
