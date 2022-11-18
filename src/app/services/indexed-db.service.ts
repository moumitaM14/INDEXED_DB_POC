import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NewWidget, Widget } from '../types/widget';

interface MyDB extends DBSchema {
  widgets: {
    value: Widget;
    key: string;
    indexes: { 'by-name': string }
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  private widgetsSubject = new BehaviorSubject<Widget[]>([]);
  db: any;

  constructor() {
    //if db is created then it'll connect else it'll create
    this.createDb().then((db: any) => {
      this.db = db;
      this.getAllWidgets().then(widgets => this.widgetsSubject.next(widgets));
    });
  }

  async addWidget(widget: NewWidget): Promise<Widget> { // to add in the collection
    await this.waitForDb();

    console.log(widget);

    let newWidgetId = await this.db.put('widgets', widget);
    this.widgetsSubject.next(await this.getAllWidgets());

    return { ...widget, id: newWidgetId }

  }

  async getAllWidgets(): Promise<Widget[]> {
    await this.waitForDb();

    const widgets: Widget[] = await this.db.getAll('widgets');
    return widgets;
  }

  async deleteWidget(widgetId: number) { // to delete form the collection
    await this.waitForDb();

    const widget: any = await this.db.delete('widgets', widgetId);

    this.widgetsSubject.next(await this.getAllWidgets());

    return widget;
  }

  async updateWidget(widget: NewWidget): Promise<Widget> {
    console.log(widget);
    await this.waitForDb();


    // {
    //   const tx = db.transaction('articles', 'readwrite');
    //   const index = tx.store.index('date');

    //   for await (const cursor of index.iterate(new Date('2019-01-01'))) {
    //     const article = { ...cursor.value };
    //     article.body += ' And, happy new year!';
    //     cursor.update(article);
    //   }

    //   await tx.done;
    // }

    let transaction = await this.db.transaction('widgets');

    
    
    this.widgetsSubject.next(await this.getAllWidgets());
    return transaction.done;
  }

  async createDb() {
    const db = await openDB<MyDB>('my-db', 1, {
      upgrade(db: any) { //collection/store
        const productStore = db.createObjectStore('widgets', {
          keyPath: 'id',
          autoIncrement: true,
        });
        productStore.createIndex('by-name', 'name')
      }
    });

    return db;
  }

  get widgets$(): Observable<Widget[]> {
    return this.widgetsSubject.asObservable();
  }

  widgetsByColor(color: 'blue' | 'red' | 'green'): Observable<Widget[]> {
    return this.widgetsSubject.asObservable().pipe(
      map(widgets => widgets.filter(widget => widget.color === color))
    )
  }

  private waitForDb() {
    if (!this.db) {
      this.db = this.createDb();
    }
    return;
  }
}
