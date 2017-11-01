
class StreamGenerator {
  
  constructor(data, query, key) {
    this.data = data;
    this.query = query;
    this.key = key;
    this.build();
  }
  
  build = () => {
    this.buildKeys();
    this.organize();
    this.sortResults();
  };
  
  buildKeys = () => {
    this.results = {};
    this.keys = {};
    this.data.forEach(el => {
      el[this.key.field].forEach(value => {
        const pk = value.pk;
        if(!this.keys[pk]) {
          this.keys[pk] = value;
        }
      });
    });
  };
  
  organize = () => {
    this.results = Object.keys(this.keys).map(pk_temp => {
      const pk = parseInt(pk_temp);
      const key = this.keys[pk];
      const movies = this.data.filter(movie => {
        return movie[this.key.field].filter(el => {
          return el.pk === pk
        }).length > 0;
      });
      return {
        key,
        movies
      };
    });
  };
  
  sortResults = () => {
    this.results = this.results.sort((a, b) => {
      let comparison = 0;
      const key = (this.key.field === 'directors' ? 'name' : 'title');
      const mul = this.key.direction === 'asc' ? 1 : -1;
      if(a.key[key] > b.key[key])
        comparison = mul;
      else if(a.key[key] < b.key[key])
        comparison = -1 * mul;
      return comparison;
    });
  };
  
  
}

export default StreamGenerator;