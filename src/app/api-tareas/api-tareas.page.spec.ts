import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiTareasPage } from './api-tareas.page';

import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DbRest } from '../services/db-rest';
import { Storage } from '@ionic/storage-angular';

describe('ApiTareasPage', () => {
  let component: ApiTareasPage;
  let fixture: ComponentFixture<ApiTareasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiTareasPage],
      imports: [
        IonicModule.forRoot(), 
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      providers: [
        DbRest,
        { provide: Storage, useValue: { 
          create: () => Promise.resolve(), 
          get: () => Promise.resolve(null), 
          set: () => Promise.resolve(), 
          remove: () => Promise.resolve() 
        }}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
