
class StreamGenerator {
  
  labelField = 'name';
  
  constructor(data=[], query='', key={field: 'directors', direction: 'desc'}) {
    this.data = data;
    this.query = query.toUpperCase().trim();
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
        const label = value[this.labelField].toUpperCase();
        if(!this.keys[pk] && label.includes(this.query)) {
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
      const mul = this.key.direction === 'asc' ? 1 : -1;
      const valueA = a.movies.length;
      const valueB = b.movies.length;
      if(valueA > valueB)
        comparison = mul;
      else if(valueA < valueB)
        comparison = -1 * mul;
      return comparison;
    });
    
  };
  
}


export default StreamGenerator;