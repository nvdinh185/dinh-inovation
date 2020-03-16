import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdeasReviewPage } from './ideas-review.page';

describe('IdeasReviewPage', () => {
  let component: IdeasReviewPage;
  let fixture: ComponentFixture<IdeasReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdeasReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
