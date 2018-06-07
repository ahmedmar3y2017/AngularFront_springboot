import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {taskEntity} from 'Entity/task';
import {TaskService} from 'task/task.service';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ElementRef, Renderer} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService]
})
export class AppComponent {

  isValidUpdate: boolean = false;
  isValidAdd: boolean = true;

  title = 'ahmed mohamed mar3y';
  model = new taskEntity(0, "", "");
  tasks: taskEntity[];

  constructor(private _task: TaskService) {
  }

  ngOnInit(): void {
    this._task.gettasks()
      .subscribe(tasks => this.tasks = tasks);
  }


  // click Message

  clickMessage = 'Hello';

  onClickMe() {
    this._task.createArticle(this.model).subscribe(data => {
      // added to table
      // this.tasks.push(this.model);

      //add to table design
      console.log(this.model.taskName);
      console.log(this.model.taskDesc);
      this.tasks.push(this.model);
      console.log(this.tasks);
      this.clickMessage = 'Done Add Task';


    }, error => {
      console.log(JSON.stringify(error.json()));
    })
  }

  onClickUpdateMe() {
    console.log("Update Button")


    //update into database
    this._task.updateArticle(this.model).subscribe(data => {

      // active add and disabled update
      this.isValidUpdate = false;
      this.isValidAdd = true;


      this.clickMessage = 'Done Update Task';

    }, error => {
      console.log(JSON.stringify(error.json()));
    })
  }

  deleteFieldValue(index, i) {
    // console.log(this.tasks[index].taskName)


    //delete from database
    this._task.deleteArticleById(i).subscribe(data => {

      //delete from table design
      this.tasks.splice(index, 1);


    }, error => {
      console.log(JSON.stringify(error.json()));
    })
    this.clickMessage = 'Done delete Task';

  }

  updateFieldValue(index, i) {
    // set data to form
    this.model = this.tasks[index];


    // active update anfd disabled Add
    this.isValidUpdate = true;
    this.isValidAdd = false;

  }
}
