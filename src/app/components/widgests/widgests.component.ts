import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericApiService } from 'src/app/services/generic-api.service';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { NewWidget, Widget } from 'src/app/types/widget';
import { AddWidgetDialogComponent } from './add-widget-dialog/add-widget-dialog.component';

@Component({
  selector: 'app-widgests',
  templateUrl: './widgests.component.html',
  styleUrls: ['./widgests.component.scss']
})
export class WidgestsComponent implements OnInit {

  widgets!: Observable<Widget[]>;

  blueWidgets!: Observable<Widget[]>;
  redWidgets!: Observable<Widget[]>;
  greenWidgets!: Observable<Widget[]>

  constructor(
    private indexedDbService: IndexedDbService,
    public dialog: MatDialog,
    private genericService: GenericApiService
  ) { }

  ngOnInit(): void {

    this.widgets = this.indexedDbService.widgets$;

    this.blueWidgets = this.indexedDbService.widgetsByColor('blue');
    this.redWidgets = this.indexedDbService.widgetsByColor('red');
    this.greenWidgets = this.indexedDbService.widgetsByColor('green')
  }

  onDeleteWidget(widget: Widget) {
    this.indexedDbService.deleteWidget(widget.id);
  }

  showAddWidgetDialog() {
    const dialogRef = this.dialog.open(AddWidgetDialogComponent, {
      width: '300px',
      data: {}
    })

    dialogRef.afterClosed().subscribe((widget: NewWidget) => {
      if (widget) {
        const newWidget = this.indexedDbService.addWidget(widget);
      }
    })

  }

  addDummyWidgets(numberOfWidgets = 3) {
    const min = 1;
    const max = 9999;

    for (let i = 0; i < numberOfWidgets; i++) {
      const widget: NewWidget = {
        name: 'Sample-' + Math.floor(min + (max - min) * Math.random()),
        color: Math.floor(min + (max - min) * Math.random()) % 2 == 0 ? 'blue' : 'red',
        price: Math.floor(min + (max - min) * Math.random())
      };

      this.indexedDbService.addWidget(widget)
    }
  }
}
