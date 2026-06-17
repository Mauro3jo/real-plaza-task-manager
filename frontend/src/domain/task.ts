export type TaskItem = {
  id: number;
  title: string;
  description: string;
  priorityCode: string;
  priorityName: string;
  statusCode: string;
  statusName: string;
};

export type CatalogOption = {
  code: string;
  name: string;
};

export type FilterOptions = {
  priorities: CatalogOption[];
  statuses: CatalogOption[];
};

export type TaskFilters = {
  status?: string;
  priority?: string;
};
