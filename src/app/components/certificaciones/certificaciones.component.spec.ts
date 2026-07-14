import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificacionesComponent } from './certificaciones.component';
import { IonicModule } from '@ionic/angular';
import { DbTaskService } from '../../services/db-task';

describe('CertificacionesComponent', () => {
  let component: CertificacionesComponent;
  let fixture: ComponentFixture<CertificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificacionesComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DbTaskService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});