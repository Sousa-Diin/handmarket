class ProductsRepository extends BaseRepository{
  constructor(){
    super('Products', [
      'id', 'cod', 'description', 'descriptionNfce',
      'sector', 'count', 'un', 'price', 'createdAt'
    ]);
  }
}
