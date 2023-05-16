import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
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
export class MaterialModule {
}
