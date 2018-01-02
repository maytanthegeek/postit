import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth.service';

interface Post {
  title: string,
  content: string,
  comments: Comment[]
}

interface Comment {
  user: string,
  comment: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  postsCol: AngularFirestoreCollection<Post>;
  posts: any;
  title: string;
  content: string;
  newComment: string;

  constructor(private afs: AngularFirestore, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges()
      .map(doc => {
        return doc.map(d => {
          const data = d.payload.doc.data() as Post;
          const id = d.payload.doc.id;
          return {id, data};
        })
      })
  }

  /*
  showComments(comments: Comment[]): void {
    let dialogRef = this.dialog.open(DialogCommentsComponent, {
      height: '400px',
      width: '250px',
      data: { comments: comments }
    });
  }
  */

  addComment(postId: string, postComments: Comment[]) {
    postComments.push({user: this.authService.userDetails.displayName, comment: this.newComment});
    this.afs.collection('posts').doc(postId).update({'comments': JSON.parse(JSON.stringify(postComments))});
  }

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content, 'comments': []});
  }

}


/*
@Component({
  selector: 'dialog-comments',
  templateUrl: 'dialog-comments.component.html',
})
export class DialogCommentsComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
*/