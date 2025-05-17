class PeopleRepository extends BaseRepository{
  constructor(){
    super(
      'Users', 
      ['ID_Nome',	'E-mail',	'Telefone',	'Status']
    );
  }
}