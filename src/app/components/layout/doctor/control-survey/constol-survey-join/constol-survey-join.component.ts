declare var $: any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Choice from 'src/app/@core/models/choice';
import ControlSurvey from 'src/app/@core/models/control-survey';
import ControlSurveyBox from 'src/app/@core/models/control-survey-box';
import { Dependency } from 'src/app/app.module';
import ChoiceGroupHttp from '../../../dash/choice/choice-group-http';
import ControlSurveyHttp from '../../../dash/control-survey/control-survey-http';

@Component({
  selector: 'app-constol-survey-join',
  templateUrl: './constol-survey-join.component.html',
  styleUrls: ['./constol-survey-join.component.css']
})
export class ConstolSurveyJoinComponent implements OnInit {

  constructor
    (
      private router: ActivatedRoute
    ) { }


  temponary: Array<ControlSurveyBox> = [];
  drawMode: boolean = true;
  id!: number;
  data!: ControlSurvey;
  container!: HTMLDivElement;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  activatedChoice!: Choice;
  containerSmall!: HTMLDivElement;
  smallCanvas!: HTMLCanvasElement;
  smallContext!: CanvasRenderingContext2D;

  choices: Array<Choice> = [];
  private positionX: number = 0;
  private positionY: number = 0;
  private startX: number = 0;
  private startY: number = 0;
  private isDown: boolean = false;
  private selection!: ControlSurveyBox;

  selectedBoxsColor: string = ""
  selectedBoxsChoiceName: string = ""
  selectedBoxsChoiceCode: string = ""

  ngAfterViewInit(): void {
    this.container = document.getElementById('bgg') as HTMLDivElement;
    this.canvas = document.getElementById('drw') as HTMLCanvasElement;
    this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;

    this.containerSmall = document.getElementById('smallContainer1') as HTMLDivElement;
    this.smallCanvas = document.getElementById('selectionCanvas') as HTMLCanvasElement;
    this.smallContext = this.smallCanvas?.getContext('2d') as CanvasRenderingContext2D;
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

      Dependency.get(ChoiceGroupHttp).getAll().subscribe(e => {
        this.choices = e;
        const activated = e[0];
        this.activatedChoice = activated;
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

      this.context.font = "normal 12px Arial";
      this.context.fillStyle = next.choice.color;
      this.context.fillText(next.choice.code, next.startX + 3, next.startY + 13);

    }
  }


  activateClassByIndex(sequence: number) {
    const next = this.choices[sequence];
    this.activateClass(next.id);
  }

  activateClass(choice: number) {
    const activated = this.choices.filter(e => e.id == choice)[0];
    this.activatedChoice = activated;
  }

  toggleMode(): void {
    this.drawMode = !this.drawMode;
  }


  mouseUp(event: MouseEvent) {
    if (this.drawMode) {
      event.preventDefault();
      event.stopPropagation();
      this.isDown = false;

      if (this.temponary.length > 0) {
        const box: ControlSurveyBox = this.temponary.pop()!;
        this.data.boxes.push(box);
      }
    }
  }

  mouseDown(event: MouseEvent) {

    if (this.drawMode) {
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
  }

  mouseMove(event: MouseEvent) {
    if (this.drawMode) {
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
      this.context.lineWidth = 2;

      this.context.strokeStyle = this.activatedChoice.color;
      this.context.strokeRect(this.startX, this.startY, width, height);

      this.context.font = "normal 12px Arial";
      this.context.fillStyle = this.activatedChoice.color;
      this.context.fillText(this.activatedChoice.code, this.startX + 3, this.startY + 13);

      const box: ControlSurveyBox = new ControlSurveyBox();
      box.width = width;
      box.height = height;
      box.startX = Math.floor(this.startX);
      box.startY = Math.floor(this.startY);
      box.choiceId = this.activatedChoice.id;
      box.choice = this.choices.filter(e => e.id == this.activatedChoice.id)[0];
      this.temponary.push(box);
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

  handle(event: MouseEvent) {

    if (!this.drawMode) {
      if (this.positionY + this.positionX == 0)
        return;

      const top = this.canvas.getBoundingClientRect().top;
      const left = this.canvas.getBoundingClientRect().left;
      const doc = document.documentElement;
      const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      const y = window.pageYOffset + top;
      const x = window.pageXOffset + left;

      this.temponary = [];
      const x1 = Number(event.clientX - x);
      const y1 = Number(event.clientY - y + scroll);

      const filter: Array<ControlSurveyBox> = this.data.boxes.filter(e =>
        (x1 <= e.startX + e.width && x1 >= e.startX) &&
        (y1 <= e.startY + e.height && y1 >= e.startY));


      if (filter.length == 0) {
        return;
      }


      selection: ControlSurveyBox;

      if (filter.length > 1) {
        var selection: ControlSurveyBox = filter[0];

        for (let i = 1; i < filter.length; i++) {
          if ((selection.width * selection.height) > (filter[i].height * filter[i].width))
            selection = filter[i];
        }

      } else {
        selection = filter[0];
      }

      this.selection = selection;
      this.changeBackgroundImageSmall(selection);
      this.showModal();
    }
  }

  changeBackgroundImageSmall(box: ControlSurveyBox) {

    this.smallContext.clearRect(0, 0, this.smallContext.canvas.width, this.smallContext.canvas.height);

    this.smallContext.canvas.width = box.width;
    this.smallContext.canvas.height = box.height;

    const image = new Image();
    const callBack = () => {
      this.smallContext.drawImage(
        image,
        box.startX,
        box.startY,
        box.width,
        box.height,
        1, 1,
        box.width,
        box.height);
    };

    image.src = this.data.image.fileName;
    image.onload = callBack;
    this.selectedBoxsColor = box.choice.color;
    this.selectedBoxsChoiceCode = box.choice.code;
    this.selectedBoxsChoiceName = box.choice.name;
  }

  showModal() {
    $('#exampleModalCenteredScrollable').modal('show');
  }

  deleteSelection() {

    if (this.selection == null || this.selection == undefined) {
      return;
    }

    this.context.clearRect(
      this.selection.startX - 1,
      this.selection.startY - 1,
      this.selection.width + 3,
      this.selection.height + 3);

    var target = this.data.boxes.filter(e => e.startX == this.selection.startX && e.startY == this.selection.startY)[0];
    var index = this.data.boxes.indexOf(target);

    if (index > -1) {
      this.data.boxes.splice(index, 1);
    }

    console.log(this.data.boxes);
  }

  change(id: number) {
    if (this.selection == null || this.selection == undefined) {
      return;
    }

    this.context.clearRect(
      this.selection.startX - 1,
      this.selection.startY - 1,
      this.selection.width + 3,
      this.selection.height + 3);

    var target = this.data.boxes.filter(e => e.startX == this.selection.startX && e.startY == this.selection.startY)[0];
    var index = this.data.boxes.indexOf(target);

    if (index < -1) {
      return;
    }

    var newChoice = this.choices.filter(e => e.id == id)[0];
    this.data.boxes[index].choiceId = id;
    this.data.boxes[index].choice = newChoice;

    this.context.lineWidth = 2;

    this.context.strokeStyle = newChoice.color;
    this.context.strokeRect(this.selection.startX, this.selection.startY, this.selection.width, this.selection.height);

    this.context.font = "normal 12px Arial";
    this.context.fillStyle = newChoice.color;
    this.context.fillText(this.activatedChoice.code, this.selection.startX + 3, this.selection.startY + 13);
  }
}
