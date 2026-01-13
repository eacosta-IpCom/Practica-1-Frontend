import { Injectable } from '@angular/core';
import { GenericService } from '../GenericService/generic-service';
import { IGenericResponse } from '../../Interfaces/igeneric-response';
import { ITask } from '../../Interfaces/itask';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  //private readonly url = environment.apiUrl; //Enviroment
  private readonly url = environment.urls.urlbase;
  constructor(private genericService: GenericService){}
  public getAll():Promise<IGenericResponse<ITask[]>>
  {
    return this.genericService.getQuery("tasks/GetAll",1);
  }

  public post(titlee:string, commentss:string):Promise<IGenericResponse<ITask>>
  {
    let request = 
    {
      title: titlee,
      coments: commentss
    }
    return this.genericService.postBody("tasks/Create",request);
  }

 public complete(id: number): Promise<IGenericResponse<boolean>> {
  // El backend espera el ID para buscar la tarea
  // Dependiendo de cómo esté configurado tu genericService.getQuery, 
  // podrías enviarlo como parámetro de URL
  return this.genericService.putBody(`tasks/MarkComplete/${id}`, {});
}

}
