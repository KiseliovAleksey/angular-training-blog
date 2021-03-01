import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.services';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  createForm: FormGroup;

  constructor(private postService: PostsService, private alert: AlertService) {}

  ngOnInit() {
    this.createForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }
  submit() {
    if (this.createForm.invalid) {
      return;
    }
    const post: Post = {
      title: this.createForm.value.title,
      author: this.createForm.value.author,
      text: this.createForm.value.text,
      date: new Date(),
    };
    this.postService.create(post).subscribe(() => {
      this.createForm.reset();
      this.alert.success('Post was created');
    });
    console.log(post);
  }
}
