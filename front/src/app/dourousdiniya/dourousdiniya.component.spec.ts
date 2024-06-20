import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DourousdiniyaComponent } from './dourousdiniya.component';

describe('DourousdiniyaComponent', () => {
  let component: DourousdiniyaComponent;
  let fixture: ComponentFixture<DourousdiniyaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DourousdiniyaComponent]
    });
    fixture = TestBed.createComponent(DourousdiniyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
