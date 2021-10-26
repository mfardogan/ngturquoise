import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ControlSurvey from 'src/app/@core/models/control-survey';
import ControlSurveyBox from 'src/app/@core/models/control-survey-box';
import { Dependency } from 'src/app/app.module';
import ControlSurveyHttp from '../control-survey/control-survey-http';

@Component({
  selector: 'app-constrol-survey-view',
  templateUrl: './constrol-survey-view.component.html',
  styleUrls: ['./constrol-survey-view.component.css']
})
export class ConstrolSurveyViewComponent implements OnInit {

  constructor
    (
      private router: ActivatedRoute
    ) { }

  successfull: boolean = false;
  id!: number;
  data!: ControlSurvey;
  container!: HTMLDivElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.container = document.getElementById('bgg') as HTMLDivElement;
    this.canvas = document.getElementById('drw') as HTMLCanvasElement;
    this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;
  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (!(id == undefined || id == '')) {
      this.id = Number(id);
      Dependency.get(ControlSurveyHttp).get(this.id).subscribe(
        (data: ControlSurvey) => {
          this.data = data;
          this.refreshBackground();
        });
    }
  }

  convertPXToVW(px: number) {
    return px * (100 / document.documentElement.clientWidth);
  }

  changeBackgroundImage(path: string) {
    const background = new Image();
    const callBack = () => {

      this.container.style.width = background.width + 'px';
      this.container.style.height = background.height + 'px';
      this.container.setAttribute("style", `background-image: url('${path.replace(/\\/g, "/")}')`);
      this.container.style.width = this.convertPXToVW(background.width) + "vw";
      this.container.style.backgroundRepeat = "no-repeat";

      this.context.fillStyle = "transparent";
      this.context.canvas.width = background.width;
      this.context.canvas.height = background.height;
      this.drawStack();
    };

    background.src = path;
    background.onload = callBack;
  }

  refreshBackground() {
    const next = this.data.image;
    this.changeBackgroundImage(next.fileName);
  }

  drawStack() {
    for (let i = 0; i < this.data.boxes.length; i++) {
      const next = this.data.boxes[i];
      this.context.strokeStyle = next.choice.color;
      this.context.lineWidth = 2;
      this.context.strokeRect(next.startX, next.startY, next.width, next.height);

    }
  }
}
