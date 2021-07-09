import Box from 'src/app/@core/models/box';
import { ActivatedRoute } from '@angular/router';
import Answer from 'src/app/@core/models/answer';
import Choice from 'src/app/@core/models/choice';
import Survey from 'src/app/@core/models/survey';
import { Component, OnInit } from '@angular/core';
import SurveyHttp from '../../dash/survey/survey-http';
import { IIterator } from 'src/app/IIterator';

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
  temponary: Array<Box> = [];
  survey: Survey = new Survey();
  container!: HTMLDivElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

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
      this.context.lineWidth = 2;
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
        });
    }
  }

  otherBackground(forwar: boolean) {
    if (forwar) {
      if (this.sequence + 1 < this.survey.images.length) {
        this.sequence++;
      }
    } else {
      if (this.sequence > 0) {
        this.sequence--;
      }
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
      const answerChoice = this.answer.getAnswerChoice(image.id);
      answerChoice.addBox(box);
    }
  }

  mouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    var top = this.canvas.getBoundingClientRect().top;
    var left = this.canvas.getBoundingClientRect().left;

    var y = window.pageYOffset + top;
    var x = window.pageXOffset + left;

    this.temponary = [];
    this.startX = Number(event.clientX - x);
    this.startY = Number(event.clientY - y);
    this.isDown = true;
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isDown) {
      return;
    }

    const top = this.canvas.getBoundingClientRect().top;
    const left = this.canvas.getBoundingClientRect().left;

    const y = window.pageYOffset + top;
    const x = window.pageXOffset + left;

    const mouseX = Number(event.clientX - x);
    const mouseY = Number(event.clientY - y);

    const width = mouseX - this.startX;
    const height = mouseY - this.startY;

    this.context.clearRect(this.startX, this.startY, width, height);
    this.context.strokeStyle = this.activatedChoice.color;
    this.context.strokeRect(this.startX, this.startY, width, height);

    const box: Box = new Box();
    box.width = width;
    box.height = height;
    box.startX = this.startX;
    box.startY = this.startY;
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
    this.context.beginPath();
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

  save() {
    const to = this.survey.images[this.sequence];
    const answer = this.answer.getAnswerChoice(to.id);

    const iterator: IIterator<Box> = answer.createIterator();
    while (!iterator.finished()) {
      const next: Box = iterator.next();
      console.log(next);
    }
  }

  undo() {
    const to = this.survey.images[this.sequence];
    const answer = this.answer.getAnswerChoice(to.id);

    if (answer.canUndo()) {
      answer.undo();
    }
  }

  redo() {
    const to = this.survey.images[this.sequence];
    const answer = this.answer.getAnswerChoice(to.id);

    if (answer.canRedo()) {
      answer.redo();
    }
  }
}
