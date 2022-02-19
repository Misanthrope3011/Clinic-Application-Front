import { NgModule } from '@angular/core';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule}  from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar';


const importArray = [MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
]


@NgModule({
  declarations: [],
  imports: [
    importArray
  ],
  exports: [importArray]
})
export class MaterialModule { }
