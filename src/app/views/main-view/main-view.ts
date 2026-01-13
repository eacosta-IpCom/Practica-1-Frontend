import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { List } from '../../components/list/list';





@Component({
  selector: 'app-main-view',
  imports: [MatToolbarModule, MatButtonModule, List],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
  standalone: true
})
export class MainView {

}
