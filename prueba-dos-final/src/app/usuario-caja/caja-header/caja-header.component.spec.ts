import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaHeaderComponent } from './caja-header.component';

describe('CajaHeaderComponent', () => {
  let component: CajaHeaderComponent;
  let fixture: ComponentFixture<CajaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CajaHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CajaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
