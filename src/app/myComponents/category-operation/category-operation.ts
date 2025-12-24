import { Component,signal,inject,OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryApi } from '../../DataAccess/category-api';
import { CategoryResponseModel } from '../../Models/Categories/CategoryResponseModel';
import { createCategoryForm, CreateCategoryForm, toCreateCategoryRequest } from '../../Validations/Categories/CreateCategoryFormFactory';
import { UpdateCetagoryForm,toUpdateCategoryRequest, updateCetagoryForm} from '../../Validations/Categories/UpdateCetagoryFormFactory';



@Component({
  selector: 'app-category-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './category-operation.html',
  styleUrl: './category-operation.css',
})

export class CategoryOperation implements OnInit {
  private categoryApi = inject(CategoryApi);

  protected categories = signal<CategoryResponseModel[]>([]);
  protected selectedCategory = signal<CategoryResponseModel|null>(null);

  //UI State
  protected createForm = createCategoryForm();
  protected updateForm = updateCetagoryForm();

  private async refreshCategories():Promise<void>{
    try{
      const values = await this.categoryApi.getAll();
      this.categories.set(values);
    }catch(error){
      console.log("Kategori listesi alınamadı:",error);
    }
  }

  async ngOnInit(): Promise<void>{
    await this.refreshCategories();
  }

  //Create İşlemleri
  async onCreate():Promise<void>{
    if(this.createForm.invalid){
      this.createForm.markAllAsTouched();
      return;
    }

    const req = toCreateCategoryRequest(this.createForm);
    await this.categoryApi.create(req);
    this.createForm.reset();
    await this.refreshCategories();
  }

  //Update İşlemleri
  startUpdate(cat: CategoryResponseModel){
    this.selectedCategory.set(cat);
    this.updateForm.patchValue(
      { 
      id: cat.id,
      name: cat.categoryName,
      description: cat.description,
      },
    {emitEvent: false}
    );
  }

  cancelUpdate(){
    this.selectedCategory.set(null);
    this.updateForm.reset({id:0, name:'', description:''});
  }

  async onUpdate(){
    if(this.updateForm.invalid){
      this.updateForm.markAllAsTouched();
      return;
    }

    const req = toUpdateCategoryRequest(this.updateForm);
    await this.categoryApi.update(req);
    this.cancelUpdate();
    await this.refreshCategories();
  }

  //Delete
  async onDelete(id:number):Promise<void>{
    const confirmDelete = window.confirm(
      `Id'si ${id} olan kategoriyi silmek istediğinzden emin misiniz?`
    );
    if(!confirmDelete) return;

    try{
      const message = await this.categoryApi.deleteById(id);
      console.log('Delete mesajı', message);

      this.categories.update((x) => x.filter((c) => c.id !== id));

      const selected = this.selectedCategory();
      if(selected && selected.id == id){
        this.selectedCategory.set(null);
      }
    }catch(error){
      console.log(error);
    }
  }

  protected labels: Record<string, string> = {
    name: 'Kategori Adı',
    description: 'Açıklama',
    id:'Id'
  };

  protected getErrorMessage(control:AbstractControl|null,label='Bu alan'):string | null {
    if(!control || (!control.touched && !control.dirty) || !control.invalid)
      return null;
    else if(control.hasError('required')) 
      return `${label} zorunludur`;
    else if(control.hasError('minlength')){
      const e = control.getError('minlength');
      return `${label} en fazla ${e.requiredlength} karakter olmalıdır`;
    }
    return `${label} geçersiz`
  }

  protected getErrorMessageByName(
    form:{controls: Record<string, AbstractControl>},
   controlName: string
  ): string | null {
    const control = form.controls[controlName];
    const label = this.labels[controlName] ?? controlName;

    return this.getErrorMessage(control, label);
  }


}
