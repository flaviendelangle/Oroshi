
class StreamGenerator {
  
  constructor(data, query, key, order) {
    this.data = data;
    this.query = query;
    this.key = key;
    this.order = order;
    this.build();
  }
  
  static getLastValue() {
    return StreamGenerator.lastValue;
  }
  
  build = () => {
    this.buildKeys();
    this.organize();
    this.sortResults();
    StreamGenerator.lastValue = this;
    
  };
  
  buildKeys = () => {
    this.results = {};
    this.keys = {};
    this.data.forEach(el => {
      el[this.key].forEach(value => {
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
        return movie[this.key].filter(el => {
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
      const key = (this.key === 'directors' ? 'name' : 'title');
      const mul = this.order.direction === 'asc' ? 1 : -1;
      let valueA, valueB;
      if(this.order.field === 'amount') {
        valueA = a.movies.length;
        valueB = b.movies.length;
      } else {
        valueA = a.key[key];
        valueB = b.key[key];
      }
      if(valueA > valueB)
        comparison = mul;
      else if(valueA < valueB)
        comparison = -1 * mul;
      return comparison;
    });
  };
  
  
}

StreamGenerator.lastValue = null;

export default StreamGenerator;