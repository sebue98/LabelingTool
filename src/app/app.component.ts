import {Component, ElementRef, ViewChild} from '@angular/core';

interface Position {
  x: number;
  y: number;
}
interface licensePlate {
  topLeft: Position;
  topRight: Position;
  botRight: Position;
  botLeft: Position;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arivo';
  licencePlates: licensePlate[] = [];
  positionsArray: Position[] = [];

  labeledPhotos: string[] = [];
  cornerCount: number = 0;
  enableFinish: boolean = false;
  imageExists: boolean = false;
  showLicensePoints: boolean = false;
  labelCounter = -1;

  imageUploaded: any | undefined;
  imageElement: HTMLImageElement | null = null;
  imageURL: any;

  uploadedImage(event: any) {
    this.showLicensePoints = false;
    this.imageUploaded = event.target.files[0];
    if(!this.labeledPhotos.includes(this.imageUploaded.name))
    {
      this.imageExists = false;
      this.cornerCount = 4;
      this.positionsArray = [];
      this.enableFinish = false;
      let tempImage = new Image();
      tempImage.src = URL.createObjectURL(this.imageUploaded);
      tempImage.onload = () => {
        this.imageElement = tempImage;
      };
      this.displayImage();
    }
    else
    {
      this.imageExists = true;
    }

  }
  addCornerPoints(event: MouseEvent){
    if(this.cornerCount > 0)
    {
      let rect = document.getElementById("carimage")!.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;

      let tempPos: Position = {x: mouseX, y: mouseY};
      this.positionsArray.push(tempPos)

      this.cornerCount -= 1;
      if(this.cornerCount < 1)
      {
        this.labeledPhotos.push(this.imageUploaded.name);
        this.enableFinish = true;
      }
    }
  }

  finishLicenseAndPushArray(){
    this.licencePlates.push({topLeft: this.positionsArray[0], botLeft: this.positionsArray[1], topRight: this.positionsArray[2],
      botRight: this.positionsArray[3]});
    this.labelCounter++;
    this.showLicensePoints = true;
    this.positionsArray = [];
    this.enableFinish = false;
    console.log(this.licencePlates);
  }

  displayImage() {
    if (this.imageUploaded) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(this.imageUploaded);
    }
  }
}
