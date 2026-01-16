import { resolve } from '$app/paths';

export type PathString = Parameters<typeof resolve>[0];

export type BreadcrumbItems = {
  label: string;
  href: PathString;
}[];
