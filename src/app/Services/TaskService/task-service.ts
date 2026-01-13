import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IGenericResponse } from '../../Interfaces/igeneric-response';
import { ITask } from '../../Interfaces/itask';
import { GenericService } from '../GenericService/generic-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly url = environment.urls.urlbase;
  private readonly basePath = 'tasks'; // Esto genera: api/tasks

  constructor(private genericService: GenericService) {}

  // GET: api/tasks
  public getAll(): Promise<IGenericResponse<ITask[]>> {
    // Eliminamos "/All" porque tu [HttpGet] en C# no tiene ruta adicional
    return this.genericService.getQuery(`${this.basePath}`, 1);
  }

  // POST: api/tasks
  public create(title: string, comments: string): Promise<IGenericResponse<ITask>> {
    const request = {
      title,
      comments: comments, // IMPORTANTE: Usamos 'comments' con doble 'm' para que C# lo reciba
    };

    // Eliminamos "/Create" porque tu [HttpPost] en C# es la ruta base
    return this.genericService.postBody(`${this.basePath}`, request);
  }

  // PUT: api/tasks/{id}/complete
  public complete(id: number): Promise<IGenericResponse<boolean>> {
    // Ajustamos a la ruta exacta: [HttpPut("{id}/complete")]
    return this.genericService.putBody(`${this.basePath}/${id}/complete`, {});
  }
}
