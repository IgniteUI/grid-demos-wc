export class AddressSortStrategy {
    constructor(private formatter: (value: any) => string) {}
  
    compareValues(a: any, b: any): number {
      const addressA = this.formatter(a)?.toLowerCase() ?? '';
      const addressB = this.formatter(b)?.toLowerCase() ?? '';
      return addressA.localeCompare(addressB);
    }
  
    sort(data: any[], fieldName: string, sortingDirection: any): any[] {
      if (!sortingDirection) return data;
  
      return [...data].sort((rowA, rowB) => {
        const valA = rowA[fieldName];
        const valB = rowB[fieldName];
        const compareResult = this.compareValues(valA, valB);
        return sortingDirection === 1 ? compareResult : -compareResult;
      });
    }
  }