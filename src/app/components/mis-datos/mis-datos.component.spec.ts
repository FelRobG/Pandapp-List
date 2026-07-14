import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisDatosComponent } from './mis-datos.component';

import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DbTaskService } from '../../services/db-task';
import { CapitalizarPipe } from '../pipes/capitalizar-pipe';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('MisDatosComponent', () => {
  let component: MisDatosComponent;
  let fixture: ComponentFixture<MisDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisDatosComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule, 
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule, 
        RouterTestingModule],
      providers: [
        { provide: DbTaskService, useValue: {} },
        CapitalizarPipe,
        DatePipe,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MisDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});