import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAddEditComponent } from './article-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: ArticleAddEditComponent;
  let fixture: ComponentFixture<ArticleAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
