import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../Services/TaskService/task-service';

@Component({
  selector: 'app-form-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-create.html',
  styleUrls: ['./form-create.css'],
})
export class FormCreate {
  @Output() taskCreated = new EventEmitter<void>();

  public form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
    comments: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
  });

  constructor(private taskService: TaskService) {}

  public async onCreate(): Promise<void> {
    if (this.form.invalid) return;

    const { title, comments } = this.form.value;

    try {
      await this.taskService.create(title!, comments!);
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.taskCreated.emit();
    } catch (error) {
      console.error('Error al crear la tarea', error);
    }
  }
}
