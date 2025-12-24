import { Component,signal,inject,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryApi } from '../../DataAccess/category-api';
import { CategoryResponseModel } from '../../Models/Categories/CategoryResponseModel';
import { CreateCategoryForm } from '../../Validations/Categories/CreateCategoryFormFactory';
import { UpdateCetagoryForm,toUpdateCategoryRequest} from '../../Validations/Categories/UpdateCetagoryFormFactory';

//etenşın pilis!! Direkt http değil bir data-access service inject edicez

@Component({
  selector: 'app-category-operation',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-operation.html',
  styleUrl: './category-operation.css',
})

export class CategoryOperation {

}
