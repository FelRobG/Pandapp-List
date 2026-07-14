import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTarjetasPage } from './menu-tarjetas.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { DbTaskService } from '../services/db-task';

describe('MenuTarjetasPage', () => {
  let component: MenuTarjetasPage;
  let fixture: ComponentFixture<MenuTarjetasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuTarjetasPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: DbTaskService, useValue: {} },
        { provide: ModalController, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTarjetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});