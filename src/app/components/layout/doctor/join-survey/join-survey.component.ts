import Box from 'src/app/@core/models/box';
import { ActivatedRoute } from '@angular/router';
import Answer from 'src/app/@core/models/answer';
import Choice from 'src/app/@core/models/choice';
import Survey from 'src/app/@core/models/survey';
import { Component, OnInit } from '@angular/core';
import SurveyHttp from '../../dash/survey/survey-http';
import { IIterator } from 'src/app/IIterator';
import { Dependency } from 'src/app/app.module';
import AnswerHttp from '../../dash/answer/answer-http';

@Component({
  selector: 'app-join-survey',
  templateUrl: './join-survey.component.html',
  styleUrls: ['./join-survey.component.css']
})
export class JoinSurveyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private answerHttp: AnswerHttp,
    private surveyHttp: SurveyHttp
  ) { }

  surveyid!: number;
  sequence: number = 0;
  activatedChoice!: Choice;
  temponary: Array<Box> = [];
  survey: Survey = new Survey();
  container!: HTMLDivElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  private positionX: number = 0;
  private positionY: number = 0;
  private answer!: Answer;
  private startX: number = 0;
  private startY: number = 0;
  private isDown: boolean = false;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's 
    //view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.container = document.getElementById('bgg') as HTMLDivElement;
    this.canvas = document.getElementById('drw') as HTMLCanvasElement;
    this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;
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
      this.context.fillStyle = "transparent";
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
        .subscribe((survey: Survey) => {
          this.survey = survey;
          this.otherBackground(true);
          this.activateClassByIndex(0);
          this.answer = Answer.prepare(survey.images.map(s => s.id));
          this.answer.surveyId = this.surveyid;
        });
    }
  }

  otherBackground(forwar: boolean) {
    if (forwar) {
      if (this.sequence + 1 < this.survey.images.length) { this.sequence++; }
    } else {
      if (this.sequence > 0) { this.sequence--; }
    }
    const next = this.survey.images[this.sequence];
    this.changeBackgroundImage(next.fileName);
  }

  zoomIn() { }
  zoomOut() { }

  mouseUp(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDown = false;

    if (this.temponary.length > 0) {
      const box: Box = this.temponary.pop()!;
      const image = this.survey.images[this.sequence];
      const picture = this.answer.getAnswerByImage(image.id);
      picture.addBox(box);
    }
  }

  mouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const top = this.canvas.getBoundingClientRect().top;
    const left = this.canvas.getBoundingClientRect().left;
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    const y = window.pageYOffset + top;
    const x = window.pageXOffset + left;

    this.temponary = [];
    this.startX = Number(event.clientX - x);
    this.startY = Number(event.clientY - y + scroll);
    this.isDown = true;
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const top = this.canvas.getBoundingClientRect().top;
    const left = this.canvas.getBoundingClientRect().left;

    const y = window.pageYOffset + top;
    const x = window.pageXOffset + left;

    const mouseX = Number(event.clientX - x);
    const mouseY = Number(event.clientY - y);

    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    this.positionX = mouseX;
    this.positionY = mouseY - scroll;

    if (!this.isDown) {
      return;
    }

    const width = mouseX - this.startX;
    const height = mouseY - this.startY + scroll;

    this.context.clearRect(this.startX, this.startY, width, height);
    this.context.lineWidth = 3;

    this.context.strokeStyle = this.activatedChoice.color;
    this.context.strokeRect(this.startX, this.startY, width, height);

    const box: Box = new Box();
    box.width = width;
    box.height = height;
    box.startX = Math.floor(this.startX);
    box.startY = Math.floor(this.startY);
    box.choiceId = this.activatedChoice.id;
    this.temponary.push(box);
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
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.context.clearRect(0, 0, width, height);
  }

  drawStack() {
    const to = this.survey.images[this.sequence];
    const answer = this.answer.getAnswerByImage(to.id);
    const iterator: IIterator<Box> = answer.createIterator();

    while (!iterator.finished()) {
      const next: Box = iterator.next();
      const choice = this.survey.choiceGroup.choices.filter(e => e.id == next.choiceId)[0];
      this.context.strokeStyle = choice.color;
      this.context.strokeRect(next.startX, next.startY, next.width, next.height);
    }
  }

  touchEnd(event: TouchEvent) {
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

  undo() {
    const to = this.survey.images[this.sequence];
    const answer = this.answer.getAnswerByImage(to.id);

    if (answer.canUndo()) {
      answer.undo();
      this.clearCanvas();
      this.drawStack();
    }
  }

  redo() {
    const to = this.survey.images[this.sequence];
    const answer = this.answer.getAnswerByImage(to.id);

    if (answer.canRedo()) {
      answer.redo();
      this.clearCanvas();
      this.drawStack();
    }
  }

  handleBox() {
    if (this.positionY + this.positionX == 0)
      return;
  }

  save() {
    this.answerHttp.add(this.answer)
      .subscribe((e: any) => {
      });
  }
}
