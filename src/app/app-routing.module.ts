import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {AboutUsComponent} from './Components/about-us/about-us.component';
import {LoginComponent} from './Components/login/login.component';
import {PricesComponent} from './Components/prices/prices.component';
import {PageNotFoundComponent} from './Components/page-not-found/page-not-found.component';
import {SignInComponent} from './Components/sign-in/sign-in.component';
import {DoctorComponent} from './Components/doctor/doctor.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthGuardLoginService} from './services/auth-guard-login-page.service';
import {PanelComponent} from './Components/panel/panel.component';
import {PatientComponent} from './Components/patient/patient.component';
import {ProfileComponent} from './Components/profile/profile.component';
import {DropdownComponent} from './Components/dropdown/dropdown.component';
import {NewsCreatorComponent} from './Components/news-creator/news-creator.component';
import {AdminRoleAuth} from './services/adminroleauth.service';
import {PatientRoleAuth} from './services/patient-role-auth.service';
import {NewsComponent} from './Components/news/news.component';
import {DoctorRoleAuth} from './services/doctorroleauth.service';
import {ContactComponent} from './Components/contact/contact.component';
import {EditProfileComponent} from './Components/editprofile/editprofile.component';
import {MedicalVisitComponent} from './Components/medical-visit/medical-visit.component';
import {DisplayVisitComponent} from './Components/display-visit/display-visit.component';
import {FinancesComponent} from './Components/finances/finances.component';
import {EditVisitComponent} from './Components/edit-visit/edit-visit.component';
import {ImageComponent} from './Components/image/image.component';
import {RatingsComponent} from './Components/ratings/ratings.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'news', component: NewsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: SignInComponent, canActivate: [AuthGuardLoginService]},
  {path: 'doctor/panel', component: DoctorComponent, canActivate: [DoctorRoleAuth]},
  {path: 'doctor/getVisits', component: DisplayVisitComponent, canActivate: [DoctorRoleAuth]},
  {path: 'doctor/getAbandoned', component: DisplayVisitComponent, canActivate: [DoctorRoleAuth]},
  {path: 'doctor/board/edit/:id', component: EditProfileComponent, canActivate: [AdminRoleAuth]},
  {path: 'doctor/board/displayVisit/:id', component: DisplayVisitComponent, canActivate: [DoctorRoleAuth]},
  {path: 'doctor/board/editVisit/:id', component: EditVisitComponent, canActivate: [DoctorRoleAuth]},
  {path: 'admin/addNews', component: NewsCreatorComponent, canActivate: [AdminRoleAuth]},
  {path: 'admin', component: DoctorComponent, canActivate: [AdminRoleAuth]},
  {path: 'patient', component: PatientComponent, canActivate: [PatientRoleAuth]},
  {path: 'patient/newVisit', component: MedicalVisitComponent, canActivate: [PatientRoleAuth]},
  {path: 'patient/getVisits', component: DisplayVisitComponent, canActivate: [PatientRoleAuth]},
  {path: 'patient/finances', component: FinancesComponent, canActivate: [PatientRoleAuth]},
  {path: 'edit/:id', component: EditProfileComponent, canActivate: [AuthGuardService]},
  {path: 'panel', component: PanelComponent, canActivate: [AuthGuardService]},
  {path: 'signUp', component: LoginComponent, canActivate: [AuthGuardLoginService]},
  {path: 'dropdown', component: DropdownComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'image', component: ImageComponent, canActivate: [AuthGuardService]},
  {path: 'patient/rate', component: RatingsComponent, canActivate: [PatientRoleAuth]},
  {path: '**', component: PageNotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
