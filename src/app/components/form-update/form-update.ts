import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Añadido Output y EventEmitter
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ITask } from '../../Interfaces/itask';
import { TaskService } from '../../Services/TaskService/task-service';

@Component({
  selector: 'app-form-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './form-update.html',
  styleUrls: ['./form-update.css'],
})
export class FormUpdate implements OnInit {
  @Input() taskEdit: ITask | null = null;
  @Output() statusChanged = new EventEmitter<void>(); // Evento para avisar al padre

  public isLoading = false;

  public form: FormGroup = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    coments: new FormControl({ value: '', disabled: true }),
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (!this.taskEdit) return;

    this.form.patchValue({
      title: this.taskEdit.title,
      coments: this.taskEdit.comments,
    });
  }

  get iconName(): string {
    return this.taskEdit?.isCompleted ? 'check_circle' : 'radio_button_unchecked';
  }

  get buttonColor(): string {
    return this.taskEdit?.isCompleted ? 'accent' : 'primary';
  }

  get tooltipText(): string {
    return this.taskEdit?.isCompleted ? 'Marcar como no completada' : 'Marcar como completada';
  }

  public async onChangeStatus(): Promise<void> {
    if (!this.taskEdit || this.isLoading) return;

    this.isLoading = true;
    try {
      const response = await this.taskService.complete(this.taskEdit.id);

      if (response.status === 200) {
        // Actualizamos localmente
        this.taskEdit.isCompleted = response.payload ?? !this.taskEdit.isCompleted;
        // Avisamos al componente TaskListComponent que recargue los datos
        this.statusChanged.emit();
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la tarea', error);
    } finally {
      this.isLoading = false;
    }
  }
}
