import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaModalComponent } from './tarjeta-modal.component';
import { IonicModule } from '@ionic/angular';
import { DatePipe } from '@angular/common';

describe('TarjetaModalComponent', () => {
  let component: TarjetaModalComponent;
  let fixture: ComponentFixture<TarjetaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetaModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});