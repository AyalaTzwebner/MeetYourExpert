import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/classes/expert';
import { ExpertsService } from 'src/app/services/experts.service';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-manager-experts',
  templateUrl: './manager-experts.component.html',
  styleUrls: ['./manager-experts.component.scss']
})
export class ManagerExpertsComponent implements OnInit {
  changes: Object[];
  allExperts: Expert[]
  constructor(private expertsService: ExpertsService, private subjectService: SubjectsService) {
    this.expertsService.getAllExperts().subscribe(
      (res: Expert[]) => {
        this.allExperts = res;
        console.log(this.allExperts)
      },
      err => {
        console.log("some error:", err)
      })
  }

  ngOnInit(): void {
  }
  getSubjectName(id: number): string {
    return this.subjectService.getSubjectById(id);
  }
  changeStatus(id: number, newStatus) {
    this.changes.push({ id: id, status: newStatus })
  }
}
