import Element from 'services/content/element';


const SORT_ORDER = {
  field: 'note',
  direction: 'desc'
};

class StreamGenerator {
  
  constructor(labelField, direction, data=[], query='', key={field: 'directors'}) {
    this.labelField = labelField;
    this.direction = direction;
    this.data = Element.sortList(data, SORT_ORDER);

    this.query = query.toUpperCase().trim();
    this.key = key;
    this.build();
  }
  
  build = _ => {
    if (this.prepareData) {
      this.prepareData();
    }
    this.buildKeys();
    this.organize();
    this.sortResults();
  };
  
  getElementCount = _ => {
    return this.data.length;
  };
  
  buildKeys = _ => {
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
  
  organize = _ => {
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
  
  sortResults = _ => {
    this.results = this.results.sort((a, b) => {
      let comparison = 0;
      const mul = this.direction === 'asc' ? 1 : -1;
      let valueA, valueB;
      if (this.key.field === 'release_year') {
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