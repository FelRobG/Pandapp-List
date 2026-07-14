import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienciaLaboralComponent } from './experiencia-laboral.component';
import { IonicModule } from '@ionic/angular';
import { DbTaskService } from '../../services/db-task';

describe('ExperienciaLaboralComponent', () => {
  let component: ExperienciaLaboralComponent;
  let fixture: ComponentFixture<ExperienciaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienciaLaboralComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DbTaskService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});