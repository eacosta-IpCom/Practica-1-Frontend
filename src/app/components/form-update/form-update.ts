import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; // Importante para el error anterior
import { CommonModule } from '@angular/common';
import { TaskService } from '../../Services/TaskService/task-service';
import { ITask } from '../../Interfaces/itask';

@Component({
  selector: 'app-form-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './form-update.html',
  styleUrl: './form-update.css'
})
export class FormUpdate implements OnInit {
  @Input() taskEdit: ITask | null = null;

  // Formulario por si quieres mostrar el título
  public formCount: FormGroup = new FormGroup({
    title: new FormControl({ value: '', disabled: true }), // Lo ponemos deshabilitado si solo es para completar
    coments: new FormControl ({ value: '', disabled: true })
  });

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.taskEdit) {
      this.formCount.patchValue({
        title: this.taskEdit.title
      });
    }
  }

  public async OnChangeStatus() {
    if (!this.taskEdit) return;

    try {
      const response = await this.taskService.complete(this.taskEdit.id);

      if (response.status === 200) {
        // payload ahora es un boolean según tu C# (response.Payload = task.IsCompleted)
        this.taskEdit.isCompleted = response.payload; 
        this.cdr.detectChanges();
        console.log('Estado actualizado en BD:', this.taskEdit.isCompleted);
      }
    } catch (error) {
      console.error("Error al cambiar estado", error);
    }
  }
}


