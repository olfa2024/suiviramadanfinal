import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsakiyaComponent } from './imsakiya.component';

describe('ImsakiyaComponent', () => {
  let component: ImsakiyaComponent;
  let fixture: ComponentFixture<ImsakiyaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImsakiyaComponent]
    });
    fixture = TestBed.createComponent(ImsakiyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
