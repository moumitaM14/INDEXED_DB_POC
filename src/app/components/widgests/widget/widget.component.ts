import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

import { NewWidget, Widget } from 'src/app/types/widget';
import { AddWidgetDialogComponent } from '../add-widget-dialog/add-widget-dialog.component';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input()
  widget!: Widget;

  @Output()
  delete = new EventEmitter<Widget>();

  constructor(
    public dialog: MatDialog,
    private indexedDbService: IndexedDbService
  ) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.delete.emit(this.widget)
  }

  onEdit(item: any) {
    const dialogRef = this.dialog.open(AddWidgetDialogComponent, {
      width: '300px',
      data: { mode: 'edit' }
    })

    dialogRef.componentInstance.name = item.name;
    dialogRef.componentInstance.color = item.color;
    dialogRef.componentInstance.price = item.price;

    dialogRef.afterClosed().subscribe((widget: NewWidget) => {
      console.log('Update', widget);
      if (widget) {
        const newWidget = this.indexedDbService.updateWidget(widget);
      }
    })
  }

}
