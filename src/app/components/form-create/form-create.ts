//import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { TaskService } from '../../Services/TaskService/task-service';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-form-create',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './form-create.html',
  styleUrl: './form-create.css',
  standalone: true
})
export class FormCreate {

  // 1. Creamos un evento para avisar al padre que se creó una tarea
  @Output() taskCreated = new EventEmitter<void>();


    public formCount: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
    coments: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(100)])
  });
  constructor (private taskService:TaskService ){}

  public async OnClicCreate(event?: Event) {
  // 1. Evita que el formulario recargue la página o se envíe dos veces
  if (event) {
    event.preventDefault();
  }

  if (this.formCount.invalid) return;

  const title = this.formCount.get('title')?.value;
  const coments = this.formCount.get('coments')?.value;

  try {
    // 2. IMPORTANTE: Solo llamar al servicio si no hay una petición en curso
    await this.taskService.post(title, coments);
    

    this.formCount.reset();
    
    // 3. Limpiar estados de validación para que no se ponga rojo al resetear
    Object.keys(this.formCount.controls).forEach(key => {
      this.formCount.get(key)?.setErrors(null);
      this.formCount.get(key)?.markAsUntouched();
    });

    this.taskCreated.emit(); 
  } catch (error) {
    console.error('Error al insertar:', error);
  }
}


}
