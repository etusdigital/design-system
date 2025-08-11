// Navigation Module - Navigation-related components
// Menus, tabs, breadcrumbs, navbar, etc.

// Re-export from legacy components until migration is complete
export { default as Menu } from '../../components/BMenu';
export { default as Tab } from '../../components/BTab';
export { default as Breadcrumb } from '../../components/BBreadcrumb';
export { default as Navbar } from '../../components/BNavbar';

// Export types
export type { BMenuProps } from '../../components/BMenu/BMenu.types';
export type { BTabProps } from '../../components/BTab/BTab.types';
export type { BBreadcrumbProps } from '../../components/BBreadcrumb/BBreadcrumb.types';
export type { BNavbarProps } from '../../components/BNavbar/BNavbar.types';