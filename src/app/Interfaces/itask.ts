export interface ITask {
  id: number;
  title: string;
  comments: string; // nombre conservado por contrato con backend
  isCompleted: boolean;
  createdAt: Date;
}
