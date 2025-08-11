// Data Display Module - Components for displaying data
// Tables, tags, cards, avatars, etc.

// Re-export from legacy components until migration is complete
export { default as Table } from '../../components/BTable';
export { default as Tag } from '../../components/BTag';
export { default as Card } from '../../components/BCard';
export { default as Avatar } from '../../components/BAvatar';
export { default as ProgressBar } from '../../components/BProgressBar';
export { default as Pagination } from '../../components/BPagination';

// Export types
export type { BTableProps } from '../../components/BTable/BTable.types';
export type { BTagProps } from '../../components/BTag/BTag.types';
export type { BCardProps } from '../../components/BCard/BCard.types';
export type { BAvatarProps } from '../../components/BAvatar/BAvatar.types';
export type { BProgressBarProps } from '../../components/BProgressBar/BProgressBar.types';
export type { BPaginationProps } from '../../components/BPagination/BPagination.types';