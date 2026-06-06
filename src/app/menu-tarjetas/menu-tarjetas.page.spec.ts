import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTarjetasPage } from './menu-tarjetas.page';

describe('MenuTarjetasPage', () => {
  let component: MenuTarjetasPage;
  let fixture: ComponentFixture<MenuTarjetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTarjetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
