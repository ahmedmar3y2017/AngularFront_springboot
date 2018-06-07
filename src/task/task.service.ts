import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {taskEntity} from 'Entity/task';

@Injectable()
export class TaskService {
  private _taskurl = 'http://localhost:8080/api/tasks';

  constructor(private _http: Http) {
  }

  gettasks(): Observable<taskEntity[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});

    let options = new RequestOptions({headers: cpHeaders});
    return this._http.get(this._taskurl, options)
      .map((response: Response) => <taskEntity[]> response.json()).do(data => console.log(JSON.stringify(data)));
  }


  createArticle(task: taskEntity): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this._http.post(this._taskurl, task, options)
      .map(success => success.status);
  }

  deleteArticleById(articleId: string): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    // let cpParams = new URLSearchParams();
    // cpParams.set('id', articleId);
    let options = new RequestOptions({headers: cpHeaders});
    return this._http.delete(this._taskurl + "/?id=" + articleId, options)
      .map(success => success.status);
  }

  updateArticle(article: taskEntity): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this._http.put(this._taskurl, article, options)
      .map(success => success.status);
  }

}
