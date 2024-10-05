import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../model/cartItem';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { CartComponent } from '../cart/cart.component';
import { CatalogoComponent } from '../catalogo/catalogo.component';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [CatalogoComponent, CartComponent],
  templateUrl: './app-carro.component.html',
  styleUrl: './app-carro.component.css'
})
export class AppCarroComponent implements OnInit  {

 //esta variable products puede cambiar cuando se divide en sub componentes 
  productos: Product[]=[];

  //variable que nos llevara el conteo de los productos en el carro de product
  items: CartItem[]= [];

  //variable para hacer el calculo del total cada vez que se elimine un carroi de compras
   total : number = 0;

   //creamos una variable para ocultar el menu del carrito
   showcar : boolean = false;

  //el constructor siempre lleva como parametro la clase del service
  constructor(private service: ProductService) {}

 //el metodo que va a traer la data desde el servidor
  ngOnInit(): void {
    this.productos = this.service.findAll();
    this.calculateTotal();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];

  }

//este metodo nos permite visualizar la informacion del carrito y hacer la sumatoria de los productos 
//y verificar la sumatoria del valor
  onAddItem(product: Product): void {
    const hastitem = this.items.find(item => item.product.id === product.id)

    if(hastitem){ 
      this.items = this.items.map(item => {

        if(item.product.id === product.id){
          return {
        
            ...item,
            quantity: item.quantity + 1,

          }
      }
      return item;

       })


    } else{

      this.items=[... this.items, {product: {...product },quantity: 1}];
    }
    this.calculateTotal();
    this.saveSession();

}
///lineas de codigo para eliminar un producto

onDeleteCart(id: number): void{
  this.items = this.items.filter(item => item.product.id !== id);
  this.calculateTotal();
  this.saveSession();


} 

calculateTotal(): void{
    this.total = this.items.reduce((acumulator, item)=>acumulator+item.quantity*item.product.price, 0);
    
}

saveSession(): void {
  sessionStorage.setItem('cart',JSON.stringify(this.items));
}

openCart() :void {
  this.showcar= !this.showcar;
}


}
