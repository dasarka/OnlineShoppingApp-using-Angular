import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule, FirebaseOptionsToken } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataService } from 'database/services/data/data.service';
import { UserService } from 'database/services/user/user.service';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    {provide: FirebaseOptionsToken, useValue: environment.firebaseConfig},
    DataService,
    UserService
  ]
})
export class DatabaseModule { }
