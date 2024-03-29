import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TokenService } from 'src/app/TokenService';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-image-by-tags',
  templateUrl: './get-image-by-tags.component.html',
  styleUrls: ['./get-image-by-tags.component.css']
})
export class GetImageByTagsComponent {
  token :any;
  buttonDisabled : boolean = true;
  imagedivHidden: boolean = true;
  imageUrls: string[] = [
  ];
  divHidden: boolean = false;
  constructor(private http: HttpClient, private tokenService: TokenService,
    private router: Router ) { }
  ngOnInit() {
      this.token = this.tokenService.getIdToken();
      if (this.token) {
        //console.log(this.token);
      }
      else {
        console.log("not logged in");
        this.router.navigate(['/']);
      }
      }
  processFile1(imageInput: any) {
    const file: File = imageInput.files[0];
    const postData = new FormData();
    postData.append("image", file);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post<any>(
      "http://localhost:3000/api/uploadImageforTags",
      postData, {headers}
    )
    .subscribe(responseData => {
      console.log(responseData.data);
      if (responseData.data.length > 0){
        this.imageUrls = responseData.data
        this.buttonDisabled = false;
      }
    });

  }
  viewImage(){
    this.imagedivHidden = false;
    this.divHidden = true;
  }

  closeImage()
  {
    this.imagedivHidden = true;
    this.divHidden = false;
  }

}
