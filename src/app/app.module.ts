import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { FetchUsersInfoService } from './services/fetch-users-info.service';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MaterialModule } from  './material/material.module';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { PricesComponent } from './Components/prices/prices.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { PopupComponent } from './Components/Popups/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentComponent } from './Components/appointment/appointment.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DoctorComponent } from './Components/doctor/doctor.component';
import { PatientComponent } from './Components/patient/patient.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuardLoginService } from './services/auth-guard-login-page.service';
import { PanelComponent } from './Components/panel/panel.component';
import { authInterceptorProviders } from './Interceptor/auth.intercaptor';
import { MedicalVisitComponent } from './Components/medical-visit/medical-visit.component';
import { DropdownComponent } from './Components/dropdown/dropdown.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NewsCreatorComponent } from './Components/news-creator/news-creator.component'
import { AdminRoleAuth } from './services/adminroleauth.service';
import { DoctorRoleAuth } from './services/doctorroleauth.service';
import { PatientRoleAuth } from './services/patient-role-auth.service';
import { NewsComponent } from './Components/news/news.component';
import { ContactComponent } from './Components/contact/contact.component';
import { EditProfileComponent } from './Components/editprofile/editprofile.component';
import { DisplayVisitComponent } from './Components/display-visit/display-visit.component';
import { FinancesComponent } from './Components/finances/finances.component';
import { EditVisitComponent } from './Components/edit-visit/edit-visit.component';
import { MessageSentComponent } from './Components/Popups/message-sent/message-sent.component';
import { VisitDeletedComponent } from './Components/Popups/visit-deleted/visit-deleted.component';
import { ImageComponent } from './Components/image/image.component';
import { RatingsComponent } from './Components/ratings/ratings.component';

@NgModule({
  declarations: [
  AppComponent,
  LoginComponent,
  HomeComponent,
  PageNotFoundComponent,
  AboutUsComponent,
  PricesComponent,
  SignInComponent,
  PopupComponent,
  AppointmentComponent,
  DoctorComponent,
  PatientComponent,
  AdminComponent,
  PanelComponent,
  MedicalVisitComponent,
  DropdownComponent,
  ProfileComponent,
  NewsCreatorComponent,
  NewsComponent,
  ContactComponent,
  EditProfileComponent,
  DisplayVisitComponent,
  FinancesComponent,
  EditVisitComponent,
  MessageSentComponent,
  VisitDeletedComponent,
  ImageComponent,
  RatingsComponent,
  ],
  imports: [
  MatDialogModule,
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  RouterModule,
  CommonModule,
  BrowserAnimationsModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  MatIconModule
  ],
  providers: [authInterceptorProviders,FetchUsersInfoService, AuthGuardService, AuthGuardLoginService,
  AdminRoleAuth, DoctorRoleAuth, PatientRoleAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
