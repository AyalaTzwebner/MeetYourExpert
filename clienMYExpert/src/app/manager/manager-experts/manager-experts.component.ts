import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/classes/expert';
import { ExpertsService } from 'src/app/services/experts.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manager-experts',
  templateUrl: './manager-experts.component.html',
  styleUrls: ['./manager-experts.component.scss']
})
export class ManagerExpertsComponent implements OnInit {
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  length: number;
  isChecked = true;
  allExperts: Expert[]
  constructor(private expertsService: ExpertsService, private subjectService: SubjectsService) {

  }
  toggleText(): string {
    if (this.isChecked)
      return "לחץ להשבתה"
    return "לחץ להפעלה"
  }
  ngOnInit(): void {
    this.expertsService.getPerPage(3, 0).subscribe(
      (res: any) => {

        this.allExperts = res.results;
        this.pageIndex = res.pagination.current;
        this.pageSize = res.pagination.perPage;
        this.length = res.pagination.length;
      },
      err => {
          console.log(err);
      }
    )
  }
  getSubjectName(id: number): string {
    return this.subjectService.getSubjectById(id);
  }
  changeStatus(id: number, newStatus: boolean) {
    this.expertsService.changeStatus(id, newStatus).subscribe(res => {
      this.expertsService.getPerPage(this.pageSize, this.pageIndex).subscribe(
        (res:any) => {
          this.allExperts = res.results;
          
        },
        err => {
          console.log("some error:", err)
        })
    }, err => {
      console.log(err)
    })
  }
  public getServerData(event?: PageEvent) {

    this.expertsService.getPerPage(event.pageSize, event.pageIndex).subscribe(
      (res: any) => {
        this.allExperts = res.results;
        this.pageIndex = res.pagination.current;
        this.pageSize = res.pagination.perPage;
        this.length = res.pagination.length;
      },
      err => {
        console.log(err)
      }
    );
    return event;
  }
}
