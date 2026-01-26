export interface TableColumn<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string;
}
