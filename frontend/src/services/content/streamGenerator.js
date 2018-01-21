import Element from 'services/content/element';


const SORT_ORDER = {
  field: 'note',
  direction: 'desc',
};

class StreamGenerator {
  constructor(labelField, direction, data = [], query = '', key = { field: 'directors' }) {
    this.labelField = labelField;
    this.direction = direction;
    this.data = Element.sortList(data, SORT_ORDER);
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
    const elements = {};
    this.results.forEach((list) => {
      list.content.forEach((el) => {
        const id = el.getPublicId();
        if (!Object.prototype.hasOwnProperty.call(elements, id)) {
          elements[id] = el;
        }
      })
    });
    return Object.keys(elements).length;
  };

  buildKeys = () => {
    this.results = {};
    this.keys = {};
    this.data.forEach((el) => {
      el.getValue(this.key.field).forEach((value) => {
        const { pk } = value;
        const label = value[this.labelField].toUpperCase();
        if (!this.keys[pk] && label.includes(this.query)) {
          this.keys[pk] = value;
        }
      });
    });
  };

  organize = () => {
    this.results = Object.keys(this.keys).map((pkTemp) => {
      const pk = parseInt(pkTemp, 10);
      const key = this.keys[pk];
      const content = this.data.filter(el => (
        el.getValue(this.key.field).filter(el2 => el2.pk === pk).length > 0
      ));
      return {
        key,
        content,
      };
    });
  };

  sortResults = () => {
    this.results = this.results.sort((a, b) => {
      let comparison = 0;
      const mul = this.direction === 'asc' ? 1 : -1;
      let valueA;
      let valueB;
      if (this.key.field === 'release_year') {
        valueA = a.key.pk;
        valueB = b.key.pk;
      } else {
        valueA = a.content.length;
        valueB = b.content.length;
      }

      if (valueA > valueB) {
        comparison = mul;
      } else if (valueA < valueB) {
        comparison = -1 * mul;
      }
      return comparison;
    });
  };
}

export default StreamGenerator;
