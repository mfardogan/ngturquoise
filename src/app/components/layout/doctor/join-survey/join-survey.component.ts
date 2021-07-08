import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Choice from 'src/app/@core/models/choice';
import Survey from 'src/app/@core/models/survey';
import SurveyHttp from '../../dash/survey/survey-http';

@Component({
  selector: 'app-join-survey',
  templateUrl: './join-survey.component.html',
  styleUrls: ['./join-survey.component.css']
})
export class JoinSurveyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private surveyHttp: SurveyHttp
  ) { }

  surveyid!: number;
  sequence: number = 0;

  activatedChoice!: Choice;
  survey: Survey = new Survey();

  container!: HTMLDivElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  private startX: number = 0;
  private startY: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private isDown: boolean = false;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's 
    //view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.container = document.getElementById('bgg') as HTMLDivElement;
    this.canvas = document.getElementById('drw') as HTMLCanvasElement;
    this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;
    this.context.globalAlpha = 0.1;
  }

  getActiveImage() {
    const next = this.survey.images[this.sequence];
    return next.fileName;
  }

  changeBackgroundImage(path: string) {
    const background = new Image();
    const callBack = () => {
      this.container.style.width = background.width + 'px';
      this.container.style.height = background.height + 'px';
      this.container.setAttribute("style", `background-image: url('${path.replace(/\\/g, "/")}')`);
      console.log(this.container.style.backgroundImage);
      this.context.canvas.width = background.width;
      this.context.canvas.height = background.height;
    };

    background.src = path;
    background.onload = callBack;
  }

  refreshBackground() {
    const next = this.survey.images[this.sequence];
    this.changeBackgroundImage(next.fileName);
  }

  ngOnInit(): void {
    const survey = this.route.snapshot.paramMap.get('id');
    if (!(survey == undefined || survey == '')) {
      this.surveyid = Number(survey);

      this.surveyHttp.get(this.surveyid)
        .subscribe(e => {
          this.survey = e;
          this.nextBackground();
          this.activateClassByIndex(0);
        });
    }
  }

  nextBackground() {
    if (this.survey.images.length > this.sequence) {
      this.sequence++;
      const next = this.survey.images[this.sequence];
      this.changeBackgroundImage(next.fileName);
    }
  }

  previousBackground() {
    if (this.sequence > 0) {
      this.sequence--;
      const next = this.survey.images[this.sequence];
      this.changeBackgroundImage(next.fileName);
    }
  }

  zoomIn() { }
  zoomOut() { }

  mouseUp(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDown = false;
  }

  mouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.startX = Number(event.clientX - this.offsetX);
    this.startY = Number(event.clientY - this.offsetY);
    this.isDown = true;
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isDown) {
      return;
    }

    const mouseX = Number(event.clientX - this.offsetX);
    const mouseY = Number(event.clientY - this.offsetY);

    const width = mouseX - this.startX;
    const height = mouseY - this.startY;

    this.context.clearRect(this.startX, this.startY, width, height);
    this.context.lineWidth = 3;
    this.context.fillStyle = "transparent";
    this.context.strokeStyle = this.activatedChoice.color;
    this.context.strokeRect(this.startX, this.startY, width, height);
  }

  activateClassByIndex(sequence: number) {
    const group = this.survey.choiceGroup;
    const next = group.choices[sequence];
    this.activateClass(next.id);
  }

  activateClass(choice: number) {
    const group = this.survey.choiceGroup;
    const activated = group.choices.filter(e => e.id == choice)[0];
    this.activatedChoice = activated;
  }

  clearCanvas() {
    this.context.beginPath();
  }

  touchEnd(event: TouchEvent) {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mouseup", {});
    this.canvas.dispatchEvent(mouseEvent);
  }

  touchStart(event: TouchEvent) {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  touchMove(event: TouchEvent) {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }
}
