
class StreamGenerator {
  
  constructor(labelField, direction, data=[], query='', key={field: 'directors'}) {
    this.labelField = labelField;
    this.direction = direction;
    
    this.data = data;
    this.query = query.toUpperCase().trim();
    this.key = key;
    this.build();
  }
  
  build = () => {
    if (this.prepareData) {
      this.prepareData();
    }
    this.buildKeys();
    this.organize();
    this.sortResults();
  };
  
  getElementCount = () => {
    return this.data.length;
  };
  
  buildKeys = () => {
    this.results = {};
    this.keys = {};
    this.data.forEach(el => {
      el.getValue(this.key.field).forEach(value => {
        const pk = value.pk;
        const label = value[this.labelField].toUpperCase();
        if (!this.keys[pk] && label.includes(this.query)) {
          this.keys[pk] = value;
        }
      });
    });
  };
  
  organize = () => {
    this.results = Object.keys(this.keys).map(pk_temp => {
      const pk = parseInt(pk_temp, 10);
      const key = this.keys[pk];
      const content = this.data.filter(el => {
        return el.getValue(this.key.field).filter(el => {
          return el.pk === pk
        }).length > 0;
      });
      return {
        key,
        content
      };
    });
  };
  
  sortResults = () => {
    this.results = this.results.sort((a, b) => {
      let comparison = 0;
      const mul = this.direction === 'asc' ? 1 : -1;
      let valueA, valueB;
      if (this.key.field === 'release') {
        valueA = a.key.pk;
        valueB = b.key.pk;
      } else {
        valueA = a.content.length;
        valueB = b.content.length;
      }
      
      if (valueA > valueB)
        comparison = mul;
      else if (valueA < valueB)
        comparison = -1 * mul;
      return comparison;
    });
    
  };
  
}


export default StreamGenerator;