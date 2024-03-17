import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header-kanban',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderKanbanComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

  addColumn(event: string) {
    if (event) {
      // this.boardService.addColumn(event)
    }
  }

}
