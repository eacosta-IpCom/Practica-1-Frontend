import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITask } from '../../Interfaces/itask';
import { TaskService } from '../../Services/TaskService/task-service';
import { FormCreate } from '../form-create/form-create';
import { FormUpdate } from '../form-update/form-update';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, FormCreate, FormUpdate],
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  // CORRECCIÓN: 'coments' con una sola 'm' para sincronizar con tu Interface e HTML
  displayedColumns: string[] = ['id', 'title', 'comments', 'completed'];
  dataSource = new MatTableDataSource<ITask>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public async loadTasks(): Promise<void> {
    try {
      const response = await this.taskService.getAll();
      this.dataSource.data = response.payload ?? [];
    } catch (error) {
      console.error('Error al cargar las tareas', error);
    }
  }
}
