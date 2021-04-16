import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Comment } from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']   
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds:string[]
  prev:string
  next:string


  @ViewChild('comForm') commentFormDirective;
  commentForm: FormGroup;
  comment:Comment
  
  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.'
    }
  };


  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private com: FormBuilder,
    @Inject(baseURL) private baseURL: string
    ) { 
      this.createForm();
    }

  ngOnInit() {

    //const id = +this.route.snapshot.params['id'];
    //this.dishservice.getDish(id)
    //.subscribe((dish)=>{this.dish=dish});

    
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
    )      
    
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  createForm() {
    /*this.commentForm = new FormGroup({
      author: new FormControl(['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]),  
      rating: new FormControl('5'),  
      comment: new FormControl(['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]),  
      date: new FormControl(formatDate(new Date(), 'dd/MM/yyyy', 'en'))
    });*/
    this.commentForm = this.com.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: new FormControl('5'),  
      comment: ['', [Validators.required, Validators.minLength(2)] ],      
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    //console.log(this.commentForm.value)
    
    this.comment = this.commentForm.value;
    this.comment.date=new Date().toISOString()
    console.log(this.comment);
    this.dish.comments.push(this.comment)
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: '5',
    });
    
  }
}
