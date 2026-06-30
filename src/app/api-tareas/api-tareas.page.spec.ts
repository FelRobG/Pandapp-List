import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiTareasPage } from './api-tareas.page';

describe('ApiTareasPage', () => {
  let component: ApiTareasPage;
  let fixture: ComponentFixture<ApiTareasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
