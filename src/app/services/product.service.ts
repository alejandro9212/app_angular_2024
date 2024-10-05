import { Injectable } from '@angular/core';
import { products } from '../data/product.data';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
 //se crea un metodo en el sercve de tipo produc el cual esta creado en el modelo
  findAll(): Product[] {

    return products ;
  }
  
}

